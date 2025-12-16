# Projelite

## Description
Projelite is a backend application developed with Node.js and Express. The project demonstrates backend development, containerization with Docker, and CI/CD automation using Jenkins.

## How to Use the Project

### Overview

#### 1. Home Page
- The home page gives you access to registration and login options.
- You can register as a company or sign in if you already have an account.

#### 2. Register Company
- Complete the form with:
  - **Username**: company name
  - **Email**: contact email
  - **Password**: secure password
- Confirm the password and click **Create Account**.
- Upon successful registration, you will be redirected to the login page.

#### 3. Login / Sign In
- Enter your **Email** and **Password**.
- Depending on the account type:
  - **Company Account**: access the company panel.
  - **Employee Account**: access the employee view.
- If the credentials are incorrect, an error message will appear.

#### 4. Dashboard / Company Panel
Once inside the company account, you can:
- **Manage Projects**: create, edit, or delete projects.
- **Manage Employees**: add employees, assign roles and projects.
- **View Tasks**: see all tasks associated with projects and employees.
- **Assign Tasks**: assign tasks to specific employees.
- **Track Progress**: visualize the status of each task and project.

#### 5. Employee Panel / Sign In as Employee
- Employees can sign in with their own account.
- Available functionalities for employees:
  - **View Assigned Tasks**: see the tasks that have been assigned to them.
    - **View Assigned Projects**: see the Projects that have been assigned to them.
  - **Update Task Status**: mark tasks as completed or in progress.

#### 6. Tasks and Projects
- Each project can contain multiple tasks.
- Tasks include:
  - Title and description
  - Status (pending, in progress, completed)
  - Assigned employee
- Projects allow efficient organization and grouping of tasks.

## Prerequisites
* Node.js 18 or higher
* npm
* Git
* Docker
* Jenkins
* Docker Hub account
* MySQL

## Database Setup
```bash
Execute the SQL file in MySQL
mysql -u root -p PROJELITE < backend/config/PROJELITE.sql
```

## Dependency Installation
```bash
cd backend
npm install
```

## Running Locally
```bash
cd backend
node server.js
```
## Jenkins Setup

### 1. Create Credentials

Create the following credentials in Jenkins:
```
DB_HOST
DB_USER
DB_PASSWORD
DB_NAME
JWT_SECRET
PORT
```

### 2. Create Pipeline Job
```
Jenkins → New Item → Pipeline → Name: projelite-ci
Pipeline script from SCM → Git repository: https://github.com/nfrpoifv/Projelite.git
Select branch to deploy
```

### 3. Configure Pipeline
```groovy
pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Docker Build & Deploy') {
            steps {
                withCredentials([
                    string(credentialsId: 'DB_HOST', variable: 'DB_HOST'),
                    string(credentialsId: 'DB_USER', variable: 'DB_USER'),
                    string(credentialsId: 'DB_PASSWORD', variable: 'DB_PASSWORD'),
                    string(credentialsId: 'DB_NAME', variable: 'DB_NAME'),
                    string(credentialsId: 'JWT_SECRET', variable: 'JWT_SECRET'),
                    string(credentialsId: 'PORT', variable: 'PORT')
                ]) {
                    bat """
                    set DB_HOST=%DB_HOST%
                    set DB_USER=%DB_USER%
                    set DB_PASSWORD=%DB_PASSWORD%
                    set DB_NAME=%DB_NAME%
                    set JWT_SECRET=%JWT_SECRET%
                    set PORT=%PORT%
                    
                    docker compose down
                    docker compose build
                    docker compose up -d
                    """
                }
            }
        }
    }
    post {
        success {
            echo 'Projelite deployed successfully'
        }
        failure {
            echo 'Deployment failed'
        }
    }
}
```

### 4. Run Pipeline

Click **Build Now** in Jenkins and wait for backend and frontend containers to start.

### 5. Verify Deployment

Open the frontend in your browser:
```
http://localhost:8090
```

The frontend will communicate with the backend automatically.

## Technologies Used

* **Backend**: Node.js, Express
* **frontend**: html,css, js
* **Database**: MySQL
* **Containerization**: Docker, Docker Compose
* **CI/CD**: Jenkins
* **Version Control**: Git