const {defineConfig, devices } =require  ("@playwright/test");

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
module.exports=defineConfig({
  testDir: "./tests" /* Run tests in files in parallel */,
  testMatch:"**/*.spec.js",
  fullyParallel: true,

  reporter: "html",

  timeout: 80*1000 /* Test time out */,
  retries: 0,

  expect: {
    timeout: 60*1000 /* assertions time out */,
  },
  workers: 2,

  use: {
    actionTimeout:40000,
    navigationTimeout:60000,
    browserName: "firefox",
    headless: true,
    screenshot: "only-on-failure",
    trace: "retain-on-failure", // Video on failure //retain-on-failure //on //off
    ignoreHTTPSErrors: true,
    permissions: ["geolocation"],
    video: "retain-on-first-failure",
    launchOptions: {args: ["--start-maximized"]},
    // viewport: {width: 1080, height: 1920},
    viewport: null,
  },
});
