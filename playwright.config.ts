import { defineConfig, devices } from '@playwright/test';
import tsconfigPaths from 'tsconfig-paths';


tsconfigPaths.register();

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['list'], // console
    ['allure-playwright'] // Allure
  ],
  use: {
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
   
    // API tests without browser
    {
      name: 'api',
      testDir: './tests/api',
      use: {
        baseURL: 'http://localhost:8080', 
      },
    },

    // Ui Tests
    {
      name: 'chromium',
      testDir: './tests/ui',
      use: { browserName: 'chromium',},
    },
        {
      name: 'firefox',
      testDir: './tests/ui',
      use: { browserName: 'firefox',},
    },
  ],
});
