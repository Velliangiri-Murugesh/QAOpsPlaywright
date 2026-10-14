import {Page,Locator} from '@playwright/test'

export class MyordersPage {
    page:Page;
    myorders:Locator;
    headings:Locator;
    orderContainer:Locator;
    OrderCount:Locator;
    home:Locator;
    dashboardSection:Locator;
    table:Locator;

    constructor(page:Page) {
        this.page=page;
        this.myorders=page.locator('button[routerlink*="/myorders"]');
        this.headings=page.locator('div.container h1');
        this.orderContainer=page.locator('div.container h1');
        this.OrderCount= page.locator('tbody th');
        this.home=page.getByRole('button',{name:'HOME'});
        this.dashboardSection=page.locator('section#products');
        this.table = page.locator("tbody tr");
        
    }


    async goToMyorder(){

        await this.home.click();
        await this.myorders.click();
        



    }
    async deleteOrder(){

        await this.orderContainer.waitFor();
        for (let delorder=0;delorder<await this.OrderCount.count();delorder++){
        await this.table.nth(delorder).getByRole('button',{name:'Delete'}).click({delay:1500});
        await this.page.reload ({waitUntil: 'networkidle'});
        console.log ("Order is deleted:"+""+ delorder)
    };


    }
}
