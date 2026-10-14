const {test, expect}= require('@playwright/test');


test("browserFixtures",async({browser})=>{

const context=await browser.newContext();
const page=await context.newPage();
await page.goto("https://www.google.com");
console.log(await page.title());
await expect(page).toHaveTitle("Google");


const context1=await browser.newContext();
const page1=await context.newPage();
await page1.goto("https://www.yahoo.com");
console.log(await page.title());
await expect(page).toHaveTitle("Yahoo");

});


test("pageFixtures",async({page})=>{
await page.goto("https://www.google.com");

});


