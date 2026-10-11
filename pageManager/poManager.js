const { LoginPage } = require("../pageObject/LoginPage.js");
const { DashBoardPage } = require("../pageObject/DashBoardPage.js");
const { CartPage } = require("../pageObject/CartPage.js");
const { OrderConfirmationPage } = require("../pageObject/OrderConfirmationPage.js");
const { MyordersPage } = require("../pageObject/MyordersPage.js");

class poManager {
  constructor(page,productName) {
    
    this.page = page;
    this.productName=productName;
    this.loginPage = new LoginPage(this.page);
    this.dashboardPage = new DashBoardPage(this.page);
    this.orderConfirmationPage = new OrderConfirmationPage(this.page);
    this.myordersPage = new MyordersPage(this.page);
    this.cartpage=new CartPage(this.page,this.productName);
    }
  

}

module.exports={poManager}