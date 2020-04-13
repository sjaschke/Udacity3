#!groovy
pipeline {
    agent any
    environment {
        PATH = "/var/lib/jenkins/.nvm/versions/node/v12.16.2/bin:${PATH}"
    }
    stages {
        stage('clean') {
            steps {
                sh 'npm run clean'
            }
        }
        stage('init') {
            steps {
                sh 'npm install'
            }
        }
        stage('test') {
            steps {
                sh 'npm run test'
            }
        }
        stage("SonarQube analysis") {
            script {
                try {
                    def projectKey = env.JOB_NAME + "_" + env.BRANCH_NAME
                    projectKey = URLDecoder.decode(projectKey, "UTF-8").replaceAll('/', ':').replaceAll('#', '').replaceAll('%2F', ':')
                    withSonarQubeEnv('sonar') {
                        sh "/opt/sonar-scanner/bin/sonar-scanner -Dsonar.projectKey=${projectKey}"
                    }
                } catch (ignore) {
                }
            }
        }
        stage("Quality Gate") {
            steps {
                timeout(time: 10, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
    }
    post {
        always {
            junit 'reports/*.xml'
        }
    }
}
