const { Before, After,BeforeStep,AfterStep,BeforeAll,AfterAll,Status } = require("@cucumber/cucumber");
const { poManager } = require("../../pageManager/poManager");
const playwright=require('@playwright/test');
const {path}=require('path');

let browser;
let context;


Before({tags: "@E2EValidations"},async function () {

    console.log("@@E2EValidations tags with Before hooks");
      
  this.productName='ADIDAS ORIGINAL';
  browser = await playwright.chromium.launch({
    headless: false,
    args: ["--start-fullscreen"],
  });
  context = await browser.newContext({ viewport: null });
  this.page = await context.newPage();
  this.pomanager=new poManager(this.page,this.productName);
});


Before({tags: "@ErrorValidation"},async function () {

    
    console.log("@@ErrorValidation tags with Before hooks");
      
  this.productName='ADIDAS ORIGINAL';
  browser = await playwright.chromium.launch({
    headless: false,
    args: ["--start-fullscreen"],
  });
  context = await browser.newContext({ viewport: null });
  this.page = await context.newPage();
  this.pomanager=new poManager(this.page,this.productName);
});




After(async function(){

  await context?.close();
});


BeforeStep(function(){



});
AfterStep( function ({result}) {
  // This hook will be executed after all steps, and take a screenshot on step failure
  if (result.status === Status.FAILED) {
    this.page.screenshot({path:'failure.png'});
}
});

AfterAll(async function () {
  await browser?.close();
});