pipeline {
    agent any

    stages {
        stage('Example') {
            environment {
                DEBUG_FLAGS = '-g'
            }
            steps {
                echo "Running ${env.BUILD_ID} on ${env.JENKINS_URL}"
                sh 'printenv'
            }
        }
        stage('Build') {
            steps {
                echo 'Building..'
            }
        }
        stage('Code Convention') {
              steps {
                   script {
                    FAILED_STAGE=env.STAGE_NAME
                }
                sh 'flake8 .'
              }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}