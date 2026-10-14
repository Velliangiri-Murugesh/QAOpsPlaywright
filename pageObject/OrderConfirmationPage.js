class OrderConfirmationPage{


    constructor(page){

        this.page=page;
        this.orderConfirmation=page.locator('.hero-primary');
        this.orderId=page.locator('.em-spacer-1 label.ng-star-inserted');
        this.table=page.locator('tbody tr');
        this.Listorders=page.locator('tbody th');
        this.orders=page.locator('button[routerlink*="/myorders"]');
        this.OrderConfirmObject={};


    }

    async Orderconfirm(userName,country){

        this.OrderConfirmObject.confimMessage=await this.orderConfirmation.textContent();
        console.log(this.OrderConfirmObject.confimMessage);
        this.OrderConfirmObject.OriginalorderId=await this.orderId.textContent();
        let spliter=this.OrderConfirmObject.OriginalorderId.split('|');
        let actualorderid=spliter[1];
        console.log("Order id is :" + actualorderid);
        await this.orders.click({delay:1000});
        await this.page.waitForLoadState('networkidle')
        await this.Listorders.last().waitFor();

        this.OrderConfirmObject.countoforders=await this.Listorders.count();

        console.log("No. of Orders present in order page"+ " "+this.OrderConfirmObject.countoforders);

        for (let iniorder=0;iniorder<this.OrderConfirmObject.countoforders;iniorder++){
            if(await this.table.locator('th').nth(iniorder).textContent()===actualorderid.trim()){

                await this.table.nth(iniorder).getByRole('button',{name:'View'}).first().waitFor({ state: 'visible', timeout: 5000 });
                await this.table.nth(iniorder).getByRole('button',{name:'View', exact: true}).scrollIntoViewIfNeeded();
                await this.page.waitForTimeout(3000);
                await this.table.nth(iniorder).getByRole('button',{name:'View', exact: true}).click({delay:2000, force: true});
                console.log(`[LOG]: Successfully clicked the 'View' button at index row ${iniorder}`);
                console.log("Order is placed and the order is displayed in order section.");
                    break;
        }
                 else {

    console.log("Order Id is not there and I'm Keep on checking into other rows.");
        }
        
    
    }
    await this.page.getByText(' order summary ').waitFor();
    this.OrderConfirmObject.OrderSumamryVisible=await this.page.getByText(' order summary ').isVisible();
    console.log("*************************"+this.OrderConfirmObject.OrderSumamryVisible);
    await this.page.getByText(actualorderid).isVisible();
   
    this.OrderConfirmObject.userName=await this.page.getByText(userName).nth(0).textContent();  
    this.OrderConfirmObject.country=await this.page.getByText(country).nth(0).textContent();
    await this.page.waitForLoadState('networkidle');





  return this.OrderConfirmObject;




}
}

module.exports={OrderConfirmationPage};