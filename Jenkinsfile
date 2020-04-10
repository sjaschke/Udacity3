pipeline {
    agent any
    environment {
        PATH = "/var/lib/jenkins/.nvm/versions/node/v12.16.2/bin:${PATH}"
    }
    stages {
        stage ('test') {
            steps {
                sh '''
                    echo "PATH = ${PATH}"
                '''
            }
        }
        stage('clean') {
            steps {
                sh 'npm run clean'
            }
        }
    }
}
