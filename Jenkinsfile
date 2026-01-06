pipeline {
    agent { label 'docker-npm' }

    environment {
        DOCKER_IMAGE = 'atticuswong174/cs-tutoring:latest'
        // Replace with your actual credential IDs from Jenkins
        DOCKER_CREDENTIALS_ID = 'docker-hub-credentials'
        SSH_CREDENTIALS_ID = 'cstutor-ssh-key'
        EC2_USER = 'ubuntu' 
        EC2_HOST = 'ec2-18-191-4-189.us-east-2.compute.amazonaws.com'
        
        // Define these in Jenkins (Pipeline -> Environment) or via credentials
        // NEXT_PUBLIC_FIREBASE_API_KEY = ...
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
												
												// 1. Install QEMU emulators for multi-platform support
												sh 'docker run --privileged --rm tonistiigi/binfmt --install all'
												
												// 2. Create and switch to a new builder that supports multi-platform
												sh 'docker buildx create --name mybuilder --use || docker buildx use mybuilder'
												sh 'docker buildx inspect --bootstrap'
												
												// 3. Execute the build
												                        sh """
												                            docker buildx build \
												                            --platform linux/amd64,linux/arm64 \
												                            -t ${DOCKER_IMAGE} \
												                            --build-arg NEXT_PUBLIC_FIREBASE_API_KEY=${env.NEXT_PUBLIC_FIREBASE_API_KEY} \
												                            --build-arg NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=${env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN} \
												                            --build-arg NEXT_PUBLIC_FIREBASE_PROJECT_ID=${env.NEXT_PUBLIC_FIREBASE_PROJECT_ID} \
												                            --build-arg NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=${env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET} \
												                            --build-arg NEXT_PUBLIC_FIREBASE_SENDER_ID=${env.NEXT_PUBLIC_FIREBASE_SENDER_ID} \
												                            --build-arg NEXT_PUBLIC_FIREBASE_APP_ID=${env.NEXT_PUBLIC_FIREBASE_APP_ID} \
												                            --build-arg NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=${env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID} \
												                            --push \
												                            .
												                        """										}
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
                            '
                        """
                    }
                }
            }
        }
    }
}
