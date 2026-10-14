const myfixtures=require('@playwright/test');
const {request}=require('@playwright/test');
const {ApiUtils}=require('./ApiUtils.spec.js');



const loginPayload={userEmail:"areyouserious@yopmail.com",userPassword:"Admin@123"};
const PlaceorderRequestPayload={orders:[{country:"British Indian Ocean Territory",productOrderedId:"6960eac0c941646b7a8b3e68"}]}

    const userName='areyouserious@yopmail.com';
    const password='Admin@123';



exports.customtest=myfixtures.test.extend(

    {

    loginfixtuers:async({browser},use)=>{

         const context=await browser.newContext();
         const page=await context.newPage();
         await page.goto('https://rahulshettyacademy.com/client/#/auth/login',{waitUntil:'load'});
         await page.getByPlaceholder('email@example.com').fill(userName);
         await page.getByPlaceholder('enter your passsword').fill(password);
         console.log( await page.getByPlaceholder('email@example.com').inputValue());
         await page.getByRole('button',{name:'login'}).click('{delay:5000}');
         await page.waitForLoadState('networkidle');
         await page.locator('.container').waitFor();
         await use(page);


    },

    

    createOrderfixtures:async({},use)=>{

         const apiRequest=await request.newContext();
         const apiUtils=new ApiUtils(apiRequest,loginPayload); //Object created for ApiUtil and value passed to constructor
         const response=await apiUtils.placeOrder(PlaceorderRequestPayload); // Calling placeOrder 
         await use(response);



        
    },


    
    
        // deleteOrderfixtures:async({createOrderfixtures})=>{
 
        //     const message=await apiRequest.deleteOrder(createOrderfixtures.orderid,createOrderfixtures.token);
        //     await use(message);



        // }


    




});