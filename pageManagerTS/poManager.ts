import { LoginPage } from "../pageObjectTs/LoginPage.ts";
import { DashBoardPage } from "../pageObjectTs/DashBoardPage.ts";
import { CartPage } from "../pageObjectTs/CartPage.js";
import { OrderConfirmationPage } from "../pageObjectTs/OrderConfirmationPage.ts";
import { MyordersPage } from "../pageObjectTs/MyordersPage.ts";
import {Page} from '@playwright/test'


export class poManager {

  page:Page;
  loginPage:LoginPage;
  dashboardPage:DashBoardPage;
  orderConfirmationPage:OrderConfirmationPage;
  myordersPage:MyordersPage;
  cartpage:CartPage;
  productName:string

  
  constructor(page:Page,productName:string) {
    
    this.page = page;
    this.productName=productName;
    this.loginPage = new LoginPage(this.page);
    this.dashboardPage = new DashBoardPage(this.page);
    this.orderConfirmationPage = new OrderConfirmationPage(this.page);
    this.myordersPage = new MyordersPage(this.page);
    this.cartpage=new CartPage(this.page,this.productName);
    }
  

}

// module.exports={poManager}