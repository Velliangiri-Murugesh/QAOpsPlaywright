import { defineConfig, devices } from "@playwright/test";

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
  testDir: "./tests" /* Run tests in files in parallel */,

  fullyParallel: true,


  reporter: "allure-playwright",


  timeout: 80*1000 /* Test time out */,
  retries: 0,

  expect: {
    timeout: 60*1000 /* assertions time out */,
  },

projects:[

{

name: "Safari",

use: {
    actionTimeout:40000,
    navigationTimeout:60000,
    browserName: "webkit",
    headless: false,
    screenshot: "only-on-failure",
    trace: "retain-on-failure", // Video on failure //retain-on-failure //on //off
    ignoreHTTPSErrors: true,
    permissions: ["geolocation"],
    video: "retain-on-failure",
    launchOptions: {args: ["--start-maximized"]},
    viewport: null,
    // ...devices['iPad (gen 11)']
  }
},
{
name: "Chrome",

use: {
    actionTimeout:40000,
    navigationTimeout:60000,
    browserName: "chromium",
    headless: true,
    screenshot: "only-on-failure",
    trace: "retain-on-failure", // Video on failure //retain-on-failure //on //off
    ignoreHTTPSErrors: true,
    permissions: ["geolocation"],
    video: "retain-on-failure",
    launchOptions: {args: ["--start-maximized"]},
    viewport: null,
    // ...devices['Pixel 10 Pro']
  }
  }]

  // workers: 1,

});
