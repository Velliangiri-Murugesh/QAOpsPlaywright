const {test,expect}=require('@playwright/test');

test.describe.configure({mode:'parallel'});
test('Navigation',async({page})=>{

    await page.goto('https://www.google.com/',{waitUntil:'networkidle'});
    await page.goto('https://www.bbc.com/',{waitUntil:'networkidle'});
    await page.goBack();
    await page.goForward();
    

})


test('hiddenOrVisible',async({page})=>{

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/',{waitUntil:'load'});
    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator('#hide-textbox').click();
    await expect(page.locator('#displayed-text')).toBeHidden();
    await page.locator('#show-textbox').click();




});


test('mouseHover',async({page})=>{

    
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/',{waitUntil:'load'});
    await page.locator('#mousehover').hover();
    



})

test('poUp',async({page})=>{

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/',{waitUntil:'load'});
    page.on('dialog',dialog=>dialog.accept());
    await page.locator('#confirmbtn').click();


});

test('frames',async({page})=>{

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/',{waitUntil:'load'});
    const framePage=page.frameLocator('#courses-iframe');
    await framePage.locator(".btn-theme[href*='/sign_up']").click();


});

test("Screenshot",async({page})=>{


await page.goto('https://rahulshettyacademy.com/AutomationPractice/',{waitUntil:'load'});
    await expect(page.locator('#displayed-text')).toBeVisible().s
    await page.locator('#hide-textbox').screenshot({path:'ss.png'});
    await page.screenshot();

})


test('visualTest',async({page})=>{

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/',{waitUntil:'load'});
    expect (await page.screenshot()).toMatchSnapshot({path:'test.png'})


})