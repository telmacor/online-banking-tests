### Tech Requirements to run the project
- Docker 29 or higher
- Install Playwright


### HOW TO

#### Run tests locally

1. Get the wiremock up
`docker-compose up -d `

2. Run tests
`npx playwright test`

3. Open playwright native test report
`npx playwright show-report`

4. Open Allure test results report
`allure serve ./allure-results`
