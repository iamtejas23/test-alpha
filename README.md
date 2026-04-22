# 🚀 Jenkins CI/CD Pipeline for AWS ECS (Fargate)

This project demonstrates a complete end-to-end CI/CD pipeline using **Jenkinsfile** to build, push, and deploy a containerized application on **AWS ECS Fargate** using **Amazon ECR**.

---

## 📌 Architecture Overview


---

## ⚙️ Tech Stack

- Jenkins (Pipeline as Code - Jenkinsfile)
- Docker
- AWS ECR (Container Registry)
- AWS ECS Fargate (Container Orchestration)
- Application Load Balancer (ALB)
- IAM Roles & Security Groups

---

## 🔁 CI/CD Flow

1. Code is pushed to GitHub  
2. Jenkins pipeline triggers automatically  
3. Docker image is built  
4. Image is pushed to Amazon ECR  
5. New ECS Task Definition is registered  
6. ECS Service is updated with latest revision  
7. ALB routes traffic to updated containers  

---

## 📄 Jenkinsfile Stages

- **Clone Repo** → Fetch source code from GitHub  
- **Build Docker Image** → Build container image  
- **Login to ECR** → Authenticate with AWS  
- **Tag & Push Image** → Push image to ECR  
- **Register Task Definition** → Create new ECS revision  
- **Update ECS Service** → Deploy latest version  

---

## 🔑 Key Concepts Learned

- Writing Jenkinsfile for CI/CD automation  
- Docker image lifecycle (build, tag, push)  
- ECS Task Definition & revisions  
- Difference between EC2 vs Fargate  
- Importance of `executionRoleArn`  
- Load Balancer integration with ECS  
- Target Group health checks  
- Security Groups and networking in AWS  

---

## ⚠️ Issues Faced & Fixes

### ❌ Docker Permission Issue
- Error: Docker socket permission denied  
- Fix: Added Jenkins user to docker group  

---

### ❌ ECS Task Failed (Execution Role Missing)
- Fix: Added `executionRoleArn` in task definition  

---

### ❌ App Not Accessible
- Fix: Opened required port in Security Group  

---

### ❌ ALB Health Check Failing
- Fix: Ensured correct port (3000) and health check path `/`  

---

### ❌ Deployment Stuck in "In Progress"
- Root Cause: Subnet mismatch between ECS and ALB  
- Fix: Aligned ALB subnets with ECS service subnets  

---

## 🌐 Access Application

After deployment:


---

## 🧠 Best Practices

- Use dynamic image tags (`BUILD_NUMBER`)  
- Avoid using `latest` tag  
- Keep ECS and ALB subnets aligned  
- Use ALB instead of public IP for production  
- Add health check grace period  

---

## 🚀 Future Improvements

- Add HTTPS using ACM  
- Integrate Route53 (custom domain)  
- Implement Blue/Green deployment  
- Add CloudWatch logging  
- Auto rollback on failure  

---

## 📚 Conclusion

This project helped in understanding real-world DevOps workflows using Jenkins and AWS, including troubleshooting common deployment issues and setting up scalable containerized infrastructure.

---

## 🙌 Author

Tejas Mane
