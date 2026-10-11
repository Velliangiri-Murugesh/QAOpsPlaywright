const{test,expect}= require('@playwright/test');


let webContextStorage;

test.beforeAll(async({browser})=>{


  const context=await browser.newContext();
  const page=await context.newPage();
  await page.goto("https://dev-pxpportal.nextgen.com/portallabhospital-26372/portal/#/user/login");
  await page.locator('#userid').fill('72mfa01');
  await page.locator('#password').fill('Pulse@01');
  await page.getByRole('button',{name:' Sign In '}).click();
  await page.waitForLoadState('networkidle');
  const storageState=await context.storageState({path:'storage.json'});
    await page.close();
    webContextStorage=await browser.newContext({storageState:'storage.json'});






});

test("LoginValidation",async()=>{

   
    const page=await webContextStorage.newPage();
    
    await page.goto("https://dev-pxpportal.nextgen.com/portallabhospital-26372/portal/#/dashboard");
    await page.waitForLoadState('networkidle'); 
    await page.locator('#feature_bill_pay').
    expect (await page.locator('#feature_bill_pay')).toBeVisible();


});

// test("DashboardClick",async()=>{

//     const page=await webStorageContext.newPage();
    
//     await page.goto("https://dev-pxpportal.nextgen.com/portallabhospital-26372/portal/#/user/login");
//     await page.waitForLoadState('networkidle'); 
//     await page.locator('#feature_bill_pay').isvisible();
//     expect (await page.locator('#feature_bill_pay')).toBeVisible();
//     await page.locator('#feature_bill_pay').click();
//     await expect(page).toHaveURL('https://dev-pxpportal.nextgen.com/portallabhospital-26372/portal/#/user/billpay');




// });