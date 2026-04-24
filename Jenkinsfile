pipeline {
    agent any

    parameters {
        string(name: 'ECR_REPO',       defaultValue: 'test-alpha',                             description: 'ECR repository name')
        string(name: 'CLUSTER_NAME',   defaultValue: 'wise-bat-xoil8c',                        description: 'ECS Cluster name')
        string(name: 'SERVICE_NAME',   defaultValue: 'alpha-task-definition-service-h1krviys', description: 'ECS Service name')
        string(name: 'TASK_FAMILY',    defaultValue: 'alpha-task-definition',                  description: 'ECS Task Definition family name')
        string(name: 'AWS_REGION',     defaultValue: 'us-east-1',                              description: 'AWS Region')
        string(name: 'CONTAINER_PORT', defaultValue: '3000',                                   description: 'Container port')
        string(name: 'CPU',            defaultValue: '256',                                    description: 'Fargate CPU units')
        string(name: 'MEMORY',         defaultValue: '512',                                    description: 'Fargate memory (MB)')
    }

    environment {
        IMAGE_TAG      = "${BUILD_NUMBER}"
        ACCOUNT_ID     = credentials('aws-account-id')
        ECR_REPO       = "${params.ECR_REPO}"
        CLUSTER_NAME   = "${params.CLUSTER_NAME}"
        SERVICE_NAME   = "${params.SERVICE_NAME}"
        TASK_FAMILY    = "${params.TASK_FAMILY}"
        AWS_REGION     = "${params.AWS_REGION}"
        CONTAINER_PORT = "${params.CONTAINER_PORT}"
        CPU            = "${params.CPU}"
        MEMORY         = "${params.MEMORY}"
    }

    stages {

        stage('Build Docker Image') {
            steps {
                sh '''
                docker build -t ${ECR_REPO}:${IMAGE_TAG} .
                '''
            }
        }

        stage('Login to ECR') {
            steps {
                sh '''
                aws ecr get-login-password --region ${AWS_REGION} | \
                docker login --username AWS --password-stdin \
                ${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com
                '''
            }
        }

        stage('Tag & Push Image') {
            steps {
                sh '''
                docker tag ${ECR_REPO}:${IMAGE_TAG} \
                ${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPO}:${IMAGE_TAG}

                docker push \
                ${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPO}:${IMAGE_TAG}
                '''
            }
        }

        stage('Register New Task Definition') {
            steps {
                sh '''
                IMAGE_URI="${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPO}:${IMAGE_TAG}"

                cat > task-def.json <<EOF
{
  "family": "${TASK_FAMILY}",
  "networkMode": "awsvpc",
  "executionRoleArn": "arn:aws:iam::${ACCOUNT_ID}:role/ecsTaskExecutionRole",
  "containerDefinitions": [
    {
      "name": "${ECR_REPO}",
      "image": "${IMAGE_URI}",
      "essential": true,
      "portMappings": [
        {
          "containerPort": ${CONTAINER_PORT},
          "hostPort": ${CONTAINER_PORT}
        }
      ]
    }
  ],
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "${CPU}",
  "memory": "${MEMORY}"
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
                  --cluster ${CLUSTER_NAME} \
                  --service ${SERVICE_NAME} \
                  --task-definition ${TASK_FAMILY} \
                  --force-new-deployment
                '''
            }
        }
    }
}