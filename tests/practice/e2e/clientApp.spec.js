const{test,expect}= require('@playwright/test');


test(`@WEB e2eWorkflow`,async({page})=>{


    const userName='areyouserious@yopmail.com';
    const password='Admin@123';
    const productName='ZARA COAT 3';

    /*
    Login into wesbiste and wait till the Dashbaord is loading
    */

    await page.goto('https://rahulshettyacademy.com/client/#/auth/login',{waitUntil:'load'});
    await page.getByPlaceholder('email@example.com').fill(userName);
    await page.getByPlaceholder('enter your passsword').fill(password);
    console.log( await page.getByPlaceholder('email@example.com').inputValue());
    await page.getByRole('button',{name:'login'}).click('{delay:5000}');
    await page.waitForLoadState('networkidle');
    await page.locator('.container').waitFor();

    
    /*
    Grab the count of no of products which are listed on the page
    */


    const allProducts=page.locator('div .card-body');
    const productCount=await allProducts.count(); //3
    console.log(productCount);
    
    /*
    Now validate the expected ProductName is there and if it is there click on add to cart
    */

    await allProducts.filter({hasText:productName}).getByRole('button',{name:'Add to Cart'}).click();
    console.log("Product name:${productName} is added to the cart");
    await expect(page.locator('text=" Product Added To Cart "')).toBeVisible();



    /*
     Click on Cart button and wait for the page to be loaded then validate whether the Added product is displayed (validate with Product name)
     
    */


    await page.getByRole('listitem').getByRole('button',{name:'Cart'}).click();



    // await page.locator('[routerlink="/dashboard/cart"]').click();
    const cartDetailVisible=await page.locator('div li').first().waitFor();
    
    // const cartProductText=await page.locator("h3:has-text('iphone 13 pro')").isVisible();
    const cartProductText=await page.getByText(productName).isVisible();


    console.log(cartProductText);
    expect(cartProductText).toBeTruthy();
      await page.getByRole('button',{name:'Checkout'}).click();


    /* After checkout and on next page Enter all the fields and Place the order */


  
    await page.locator('div .payment').waitFor();

    await page.locator("div .input").nth(0).fill('4100 0000 0000 0000');
 
    const normaldropDown=page.locator("select.ddl").first();
    await normaldropDown.selectOption('12');
    const yeardropDown=page.locator("select.ddl").last();
    await yeardropDown.selectOption('31');


    // await page.getByText('CVV Code ').fill('987');
    // await page.getByText('Name on Card ').fill('SEPTOPIUM');
    
    await page.locator('div .input').nth(3).fill('456');
    await page.locator('div .input').nth(4).fill('Joker');

    // await page.getByText('Apply Coupon').fill('rahulshettyacademy');
    await page.locator('div .input').nth(5).fill('rahulshettyacademy');
    await page.locator("button:has-text('Apply Coupon')").click();
    await page.locator('p:has-text("* Coupon Applied")').waitFor();
    await expect(page.locator('.user__name [type="text"]').first()).toHaveText(userName);
    const newDropDown=page.locator('div .form-group');
    await newDropDown.click();
    await newDropDown.pressSequentially("Mala");
    
    await page.locator('.ta-results').getByRole('button',{name:'Malawi'}).click();
    
    // const DropDownresults=page.locator('.ta-results');
    // await DropDownresults.waitFor();

    // const resultCount=await newDropDown.locator('.ta-results button').count();
    // console.log(resultCount);

    // for (let ini=0;ini<resultCount;ini++){

    //     const country=await DropDownresults.locator('button').nth(ini).textContent();

    //     console.log(country);

    //     if(country.trim()==="Malawi"){

    //         DropDownresults.locator('button').nth(ini).click();
    //         break;
    //     }
    // }

    await page.locator('.actions a').click();


    /* Click on Place order button 
    */
const orderConfirmation=page.locator('.hero-primary');
await orderConfirmation.waitFor();
await expect(orderConfirmation).toHaveText(' Thankyou for the order. ');
const orderId=await page.locator('.em-spacer-1 label.ng-star-inserted').textContent();
let spliter=orderId.split('|');
let actualorderid=spliter[1];
 console.log("Order id is :" + spliter[1]);



await page.locator('button[routerlink*="/myorders"]').click({delay:500});


    /* Validating the order is displayed on order page
    */

await page.locator('div.container h1').waitFor();

const table=page.locator('tbody tr');

const countoforders= await page.locator('tbody th').count();

console.log("No. of Orders present in order page"+ " "+countoforders);

for (let iniorder=0;iniorder<countoforders;iniorder++){
       

if(await table.locator('th').nth(iniorder).textContent()===actualorderid.trim()){

     await table.nth(iniorder).getByRole('button',{name:'View'}).first().waitFor();
     await table.nth(iniorder).getByRole('button',{name:'View'}).click({delay:1500});
     console.log("Order is placed and the order is displayed in order section.")

    break;
}

else {

    console.log("Order id is not there. Please check again")
}


}


await expect(page.getByText(' order summary ')).toBeTruthy();
await page.getByText(actualorderid).isVisible();
await expect(page.getByText('areyouserious@yopmail.com').nth(0)).toHaveText(userName);
await expect(page.getByText('Malawi').nth(0)).toContainText('Malawi');

/* Delete order */ 

await page.locator('button[routerlink*="/myorders"]').click({delay:500});

await page.locator('div.container h1').waitFor();

for (let delorder=0;delorder<await page.locator('tbody th').count();delorder++){
       
await table.nth(delorder).getByRole('button',{name:'Delete'}).click({delay:1500});
await page.reload ({waitUntil: 'networkidle'});
console.log ("Order is deleted:"+""+ delorder)

}

});


