const { test, expect, request } = require("@playwright/test");
const {ApiUtils}=require('../../../utils/ApiUtils.spec')

const loginPayload = {
  userEmail: "areyouserious@yopmail.com",
  userPassword: "Admin@123",
};
const PlaceorderRequestPayload = {
  orders: [
    {
      country: "British Indian Ocean Territory",
      productOrderedId: "6960eac0c941646b7a8b3e68",
    },
  ],
};
const fakeOrderResponse = { data: [], message: "No Orders" };

let response;

test.beforeAll(async () => {
  //Api Data

  const apiRequest = await request.newContext();
  const apiUtils = new ApiUtils(apiRequest, loginPayload); //Object created for ApiUtil and value passed to constructor
  response = await apiUtils.placeOrder(PlaceorderRequestPayload); // Calling placeOrder
});

test.beforeEach(async () => {});

test(`@API e2ePlaceOrderWorkflow`, async ({ page }) => {
  //Test Data

  const userName = "areyouserious@yopmail.com";
  const password = "Admin@123";
  const productName = "ZARA COAT 3";

  /*Calling the API to insert the token into localstorage to avoid the login*/

  page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, response.token);

  /*
    Login into wesbiste by passing token and wait till the Dashbaord is loading
    */

  await page.goto("https://rahulshettyacademy.com/client/#/auth/login", {
    waitUntil: "load",
  });
  await page.locator(".container").waitFor();

  /* Netwrok Interception to validate the order is not displayed on order page
   */

  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async (route) => {
      const originalResponse = await page.request.fetch(route.request()); // Fetch the original response from the server for the call which in route method and store it in a variable

      route.fulfill({
        // fulfill the route with the original response and modify the response with fakeOrderResponse

        originalResponse,
        body: JSON.stringify(fakeOrderResponse), //Fake response is passed to body to modify the response and validate the order is not displayed on order page
      });
    },
  );

  await page.locator('button[routerlink*="/myorders"]').click({ delay: 500 });



  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
    async (route) => {
      await route.continue({
        url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=610f3e7c1b0d9a0015e4f8c6",
      });
    },
  );
});

test(`@API abort`, async ({ page }) => {

  /*Calling the API to insert the token into localstorage to avoid the login*/

  page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, response.token);

  /*
    Login into wesbiste by passing token and wait till the Dashbaord is loading
    
  */
  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async (route) => {
      await route.abort();
      await page.goto("https://rahulshettyacademy.com/client/#/auth/login", {
    waitUntil: "load",
  });
  await page.locator(".container").waitFor();
      await expect(page.locator("p").last()).toHaveText(
        "You are not authorize to view this order",
      );
    },
  );
});
