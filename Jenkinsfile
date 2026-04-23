pipeline {
    agent { label 'docker-runner' }

    environment {
        AWS_REGION   = 'us-east-1'
        ECR_REPO     = 'test-alpha'
        ACCOUNT_ID   = '069176179632'
        IMAGE_TAG    = "${BUILD_NUMBER}"
        CLUSTER_NAME = 'wise-bat-xoil8c'
        SERVICE_NAME = 'alpha-task-definition-service-h1krviys'
        TASK_FAMILY  = 'alpha-task-definition'
    }

    stages {

        stage('Clone Repo') {
            steps {
                git branch: 'main', url: 'https://github.com/iamtejas23/test-alpha.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                docker build -t $ECR_REPO:$IMAGE_TAG .
                '''
            }
        }

        stage('Login to ECR') {
            steps {
                sh '''
                aws ecr get-login-password --region $AWS_REGION | \
                docker login --username AWS --password-stdin \
                $ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com
                '''
            }
        }

        stage('Tag & Push Image') {
            steps {
                sh '''
                docker tag $ECR_REPO:$IMAGE_TAG \
                $ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPO:$IMAGE_TAG

                docker push \
                $ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPO:$IMAGE_TAG
                '''
            }
        }

        stage('Register New Task Definition') {
            steps {
                sh '''
                IMAGE_URI="$ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPO:$IMAGE_TAG"

                cat > task-def.json <<EOF
{
  "family": "$TASK_FAMILY",
  "networkMode": "awsvpc",
  "executionRoleArn": "arn:aws:iam::$ACCOUNT_ID:role/ecsTaskExecutionRole",
  "containerDefinitions": [
    {
      "name": "test-alpha",
      "image": "$IMAGE_URI",
      "essential": true,
      "portMappings": [
        {
          "containerPort": 3000,
          "hostPort": 3000
        }
      ]
    }
  ],
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "256",
  "memory": "512"
}
EOF

                aws ecs register-task-definition \
                  --cli-input-json file://task-def.json
                '''
            }
        }

        stage('Update ECS Service') {
            steps {
                sh '''
                aws ecs update-service \
                  --cluster $CLUSTER_NAME \
                  --service $SERVICE_NAME \
                  --task-definition $TASK_FAMILY \
                  --force-new-deployment
                '''
            }
        }
    }
}