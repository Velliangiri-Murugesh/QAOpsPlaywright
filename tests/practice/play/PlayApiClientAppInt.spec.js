const{test,expect,request}= require('@playwright/test');
const {ApiUtils}=require('../../../utils/ApiUtils.spec')


const loginPayload={userEmail:"areyouserious@yopmail.com",userPassword:"Admin@123"};
const PlaceorderRequestPayload={orders:[{country:"British Indian Ocean Territory",productOrderedId:"6960eac0c941646b7a8b3e68"}]}


let response;


test.beforeAll(async()=>{

//Api Data 

    const apiRequest=await request.newContext();
    const apiUtils=new ApiUtils(apiRequest,loginPayload); //Object created for ApiUtil and value passed to constructor
    response=await apiUtils.placeOrder(PlaceorderRequestPayload); // Calling placeOrder 
    const message=await apiUtils.deleteOrder(response.orderid,response.token); // Calling deleteOrder to delete the order created in placeOrder




})


test.beforeEach(async()=>{


});


test.only('e2ePlaceOrderWorkflow',async({page})=>{



    //Test Data

    const userName='areyouserious@yopmail.com';
    const password='Admin@123';
    const productName='ZARA COAT 3';


    /*Calling the API to insert the token into localstorage to avoid the login*/

    page.addInitScript(value=>{window.localStorage.setItem('token',value)},response.token);

    /*
    Login into wesbiste by passing token and wait till the Dashbaord is loading
    */

    await page.goto('https://rahulshettyacademy.com/client/#/auth/login',{waitUntil:'load'});
    await page.locator('.container').waitFor();


    await page.locator('button[routerlink*="/myorders"]').click({delay:500});


    /* Validating the order is displayed on order page
    */

await page.locator('div.container h1').waitFor();

const table=page.locator('tbody tr');

const countoforders= await page.locator('tbody th').count();

console.log("No. of Orders present in order page"+ " "+countoforders);

for (let iniorder=0;iniorder<countoforders;iniorder++){
       

if(await table.locator('th').nth(iniorder).textContent()===response.orderid.trim()){

     await table.nth(iniorder).getByRole('button',{name:'View'}).first().waitFor();
     await page.waitForTimeout(3000);
     await table.nth(iniorder).getByRole('button',{name:'View'}).click({delay:1500});
     console.log("Order is placed and the order is displayed in order section.")
    break;
}

else {

    console.log("Order id is not there. Please check again")
}


}


await expect(page.getByText(' order summary ')).toBeTruthy();
await page.getByText(response.orderid).isVisible();
await expect(page.getByText('areyouserious@yopmail.com').nth(0)).toHaveText(userName);
await expect(page.getByText('British Indian Ocean Territory').nth(0)).toContainText('British Indian Ocean Territory');



});


