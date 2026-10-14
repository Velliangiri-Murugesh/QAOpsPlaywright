const {test,expect}=require("@playwright/test");
const {customtest}=require('../../../utils/fixtures.spec.js');


customtest("fixturesLoginDemo",async({loginfixtuers,createOrderfixtures})=>{ //add deleteOrderfixtures if you need to delete the order after test case execution

    await loginfixtuers.goto('https://rahulshettyacademy.com/client/#/dashboard/dash',{waitUntil:'load'});
    await loginfixtuers.locator('.container').waitFor();
    await loginfixtuers.locator('button[routerlink*="/myorders"]').click({delay:500});
    await loginfixtuers.locator('h1:has-text("My Orders")').isVisible();
    expect (await loginfixtuers.getByText(createOrderfixtures.orderid).isVisible()).toBeTruthy();
    // await loginfixtuers.locator(`div:has-text('${deleteOrderfixtures.message}')`).isVisible();

});