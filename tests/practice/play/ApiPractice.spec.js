const {test,expect,request} = require('@playwright/test')


const callUri='https://rahulshettyacademy.com/api/ecom/auth/login';
const loginPayload={userEmail:"areyouserious@yopmail.com",userPassword:"Admin@123"};
const placeOrderuri='https://rahulshettyacademy.com/api/ecom/order/create-order';

const PlaceorderRequestPayload={orders:[{country:"British Indian Ocean Territory",productOrderedId:"6960eac0c941646b7a8b3e68"}]}

let userToken;
let orderid;

test.describe.configure({ mode: 'serial' });

// test ('ApiTest',async()=>{


//     const apirequest=await request.newContext();

//     const loginResponse=await apirequest.post('https://api.eventhub.rahulshettyacademy.com/api/auth/login',{

//         data: loginPayload

//     })

//     // expect.soft (loginResponse.ok()).toBeTruthy();
//     const loginResponsejson=await loginResponse.json();
//     const token=loginResponsejson.token;
//     console.log(loginResponsejson.token);



// })



test('UserToken',async()=>{

    const apiRequest=await request.newContext();
    const loginResponse=await apiRequest.post(callUri,{

        data:loginPayload

    })

    expect (loginResponse.ok()).toBeTruthy();

    const loginResponsePayload=await loginResponse.json();
    userToken=await loginResponsePayload.token;
    console.log(userToken);
})


test.beforeEach(async()=>{


});


test('OrderPlace',async()=>{

    const orderapireq=await request.newContext();

    const orderResponsePayload=await orderapireq.post(placeOrderuri,{

        data:PlaceorderRequestPayload,
        headers:{

             'Authorization':userToken,
             'content-Type':'application/json',
             'ignoreHTTPSErrors':'true'



        }

        
        
    })

    // expect(await orderResponsePayload.ok());
    const orderRequestPayloadJson=await orderResponsePayload.json();
    console.log(orderRequestPayloadJson);
    orderid=orderRequestPayloadJson.orders[0];
    console.log(orderid);


});


test('orderDelete',async()=>{



const apireq=await request.newContext();
const apideleteresponse=await apireq.delete(`https://rahulshettyacademy.com/api/ecom/order/delete-order/${orderid}`,{



headers:{ 

             'Authorization':userToken,
             'content-Type':'application/json',
             'ignoreHTTPSErrors':'true'
        }


})

expect (apideleteresponse.ok()).toBeTruthy();
const con=await apideleteresponse.json();
const message=await con.message;
console.log(message);




})