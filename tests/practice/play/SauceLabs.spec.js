const { test,expect } = require("@playwright/test")


test('TestLocators',async({page})=>{

    await page.goto('https://www.saucedemo.com/',{waitUntil:'load'});

    await page.getByLabel('Username').fill('standard_user');
    await page.getByLabel('password').fill('secret_sauces');
    await page.locator('[data-test="login-button"]').click();    
    await page.getByLabel('Dismiss error').waitFor();
    await page.getByLabel('Dismiss error').click();
    await page.getByLabel('password').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();  
    await page.waitForURL('**\/inventory.html');
    await expect ( page.getByRole('button',{name:'Open Menu'})).toBeVisible();
    await expect ( page.getByText('Sauce Labs Backpack')).toBeVisible();
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
    await page.getByRole('button',{name:'Checkout'}).click();
 
})
;
