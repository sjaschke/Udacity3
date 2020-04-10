pipeline {
    agent any
    environment {
        NVM_DIR='/var/lib/jenkins/.nvm'
    }
    stages {
        stage('clean') {
            steps {
                sh 'npm run clean'
            }
        }
    }
}
