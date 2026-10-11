const {test,expect}=require("@playwright/test");
const {customEventfixture}=require('../../../utils/eventhubfixtureUtil.spec.js');








customEventfixture('login',async({loginFixture})=>{

    await loginFixture.goto('https://eventhub.rahulshettyacademy.com/dashboard');

});




