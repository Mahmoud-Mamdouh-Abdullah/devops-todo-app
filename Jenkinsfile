pipeline {
    agent any

    stages{
        stage('Install Dependencies') {
            steps {
                script {
                    sh 'npm install'
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    sh 'npm test'
                }
            }
        }

        stage ('Docker Build and Push') {
            steps {
                script {
                    echo 'Building and pushing to Docker hub'
                    docker.build("mahmoudabdullah/devops:jenkins-test")

                    docker.withRegistry('https://index.docker.io/v1/', 'my-docker-hub') {
                        docker.image("mahmoudabdullah/devops:jenkins-test").push()
                    }
                }
            }        
        }
    }
}