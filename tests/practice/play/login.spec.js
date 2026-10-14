const {test,expect} = require('@playwright/test');


test('LoginTest',async({browser})=>{

    const context=await browser.newContext();
    const page=await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await page.locator('#username').fill('rahulshettyacademy');
    await page.locator('#password').fill('Learning@830$3mK2');
    await page.locator('input[value="user"]').click();
    await page.locator('//p[normalize-space()="You will be limited to only fewer functionalities of the app. Proceed?"]').visible();
    await page.locator('#okayBtn').click();
    await page.locator('#terms').click();
    await page.locator('#signInBtn').click();


    const context1=await browser.newContext();
    const page1=await context.newPage();
    await page1.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await page1.locator('#username').fill('rahulshettyacademy');
    await page1.locator('#password').fill('Learning@830$3mK2');
    await page1.locator('input[value="admin"]').click();
    await page1.locator('#terms').click();
    await page1.locator('#signInBtn').click();

});


test("FailedLoginTest",async({page})=>{

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await page.locator('#username').fill('rahulshettyacademy');
    await page.locator('#password').fill('Leasrning@830$3mK2');
    await page.locator('input[value="admin"]').click();
    await page.locator('#terms').click();
    await page.locator('#signInBtn').click();
    await page.locator('[style*=block]').visible();
    await expect.soft(page.locator('[style*=block]')).toContainText('Incorrect');
    console.log(await page.locator('[style*=block]').textContent());
    await expect.soft(page.locator('[style*=block]')).toContainText('Nothing');
    await page.locator('#password').fill('Leasrning@830$3mK2');
    await page.locator('#signInBtn').click();

});

test("GetTheproductText",async({page})=>{

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await page.locator('#username').fill('rahul');
    await page.locator('#password').fill('Learning@830$3mK2');
    await page.locator('input[value="admin"]').click();
    await page.locator('#terms').click();
    await page.locator('#signInBtn').click();
    await page.locator('[style*=block]').visible();
    await expect.soft(page.locator('[style*=block]')).toContainText('Incorrect');
    console.log(await page.locator('[style*=block]').textContent());
    await page.locator('#username').clear();
    await page.locator('#username').fill('rahulshettyacademy');
    await page.locator('#signInBtn').click();
    const firstElement=await page.locator (".card-body a").nth(0).textContent();
    const secondElement=await page.locator (".card-body a").nth(1).textContent();
    const thirdElement=await page.locator (".card-body a").nth(2).textContent();
    const fourthElement=await page.locator (".card-body a").nth(3).textContent();
    console.log(firstElement);
    console.log(secondElement);
    console.log(thirdElement);
    console.log(fourthElement);
    const allElements=await page.locator(".card-body a").allTextContents();
    console.log(allElements);
});

test('assignmentOne',async({page})=>{

    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.locator('.login-wrapper-footer-text a').click();
    await page.locator('#firstName').fill('areyou');
    await page.locator('#lastName').fill('serious');
    await page.locator('#userMobile').fill('9922250000');
    await page.locator('#userEmail').fill('areyouserious@yopmail.com');
    await page.locator('input[value="Male"]').click();
    await page.locator('#userPassword').fill('Admin@123');
    await page.locator('#confirmPassword').fill('Admin@123');
    await page.locator('input[type="checkbox"]').click();
    await page.locator('#login').click();   
    
});

test("dropDownTest",async({page})=>{

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await page.locator('#username').fill('rahulshettyacademy');
    await page.locator('#password').fill('Learning@830$3mK2');
    await page.locator('input[value="user"]').click();
    await page.locator('//p[normalize-space()="You will be limited to only fewer functionalities of the app. Proceed?"]').visible();
    await page.locator('#okayBtn').click();
    await page.locator('select.form-control').selectOption('Teacher');
    await page.locator('#terms').click();
    await page.locator('#signInBtn').click();


});


test('UIflows',async({page})=>{

   const blinkerText=page.locator("[href*='documents-request']");
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await expect (blinkerText).toHaveAttribute('class','blinkingText');
    await page.locator('#username').fill('rahulshettyacademy');
    await page.locator('#password').fill('Learning@830$3mK2');
    await page.locator('input[value="user"]').click();
    await page.locator('//p[normalize-space()="You will be limited to only fewer functionalities of the app. Proceed?"]').visible();
    await page.locator('#okayBtn').click();    
    await page.locator('input[value="admin"]').click();
    expect(await page.locator('input[value="user"]').isChecked()).toBeFalsy();
    await page.locator('select.form-control').selectOption('Teacher');
    await page.locator('#terms').click();
    await page.locator('#signInBtn').click();

    
});


test('NewTab',async({browser})=>{

    const context=await browser.newContext();
    const page=await context.newPage();
    const blinkerText=page.locator("[href*='documents-request']");
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await expect (blinkerText).toHaveAttribute('class','blinkingText');
  
    
    const [newPage]=await Promise.all([
    context.waitForEvent('page'),
    blinkerText.click()]);

    await newPage.waitForLoadState();
    const text= await newPage.locator('p.red').textContent();
    console.log(text);

    const newSplit= text.split('@')[1].split('.')[0];

    await page.locator('#username').fill(newSplit);

    console.log(await page.locator('#username').inputvalue());



    
});

test("NewTaborWindow",async({browser})=>{

    const context=await browser.newContext();
    const page=await context.newPage();
    await page.goto("https://practice-automation.com/window-operations/");
    await page.waitForLoadState('load');

    const [newTab]=await Promise.all([
        context.waitForEvent('page'),
        page.locator('.custom_btn').first().click()
]);

await newTab.getByText('Start learning').visible();

await page.locator('.custom_btn').nth(1).isVisible();

await expect(newTab.locator("img[src*='/ai-tutorials.png']")).toBeVisible();

await expect(page.locator('.custom_btn').nth(1)).toBeVisible();


const [newwindow]=await Promise.all([
context.waitForEvent('page'),
page.locator('.custom_btn').nth(3).click()

]);


await expect(newwindow.locator("img[src*='/git-tutorials.png']")).toBeVisible();


});

// test.only("promiseDiffway",async({browser})=>{

//     const context=await browser.newContext();
//     const page=await context.newPage();
//     await page.goto("https://practice-automation.com/window-operations/");
//     await page.waitForLoadState('load');
//     const newPromise=context.waitForEvent('page',async()=>{await page.locator('.custom_btn').nth(3).click();});
    
//     const newWindow=await newPromise;
//     await newWindow.waitForLoadState();
//     await expect(newWindow.locator("img[src*='/git-tutorials.png']")).toBeVisible();
//     await newWindow.locator("img[src*='/git-tutorials.png']").click();



// });


