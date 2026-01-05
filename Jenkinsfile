pipeline {
    agent { label 'docker-npm' }

    environment {
        DOCKER_IMAGE = 'atticuswong174/cs-tutoring:latest'
        // Replace with your actual credential IDs from Jenkins
        DOCKER_CREDENTIALS_ID = 'docker-hub-credentials'
        SSH_CREDENTIALS_ID = 'cstutor-ssh-key'
        EC2_USER = 'ubuntu' 
        EC2_HOST = 'ec2-18-191-4-189.us-east-2.compute.amazonaws.com'
    }

    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Lint') {
            steps {
                sh 'npm run lint'
            }
        }

        stage('Test') {
            steps {
                script {
                    echo 'No test script yet. Skipping tests.'
                }
            }
        }

        stage('Build and Push Docker Image') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: DOCKER_CREDENTIALS_ID, passwordVariable: 'DOCKER_PASS', usernameVariable: 'DOCKER_USER')]) {
                        sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                        
                        // Ensure buildx is set up
                        sh 'docker buildx create --use || true'
                        
                        sh """
                            docker buildx build \
                            --platform linux/amd64,linux/arm64 \
                            -t ${DOCKER_IMAGE} \
                            --push \
                            .
                        """
                    }
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                script {
                    withCredentials([sshUserPrivateKey(credentialsId: SSH_CREDENTIALS_ID, keyFileVariable: 'SSH_KEY')]) {
                        sh """
                            ssh -i ${SSH_KEY} -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} '
                                cd website
                                docker pull ${DOCKER_IMAGE}
                                docker compose down || true
                                docker compose up -d
                            '
                        """
                    }
                }
            }
        }
    }
}
