class DashBoardPage {
    constructor(page) {

        this.page=page;
        this.allProducts=page.locator('div .card-body');
        this.cartButton=page.getByRole('listitem').getByRole('button',{name:'Cart'});
       
  
        
    }


    async searchNplaceOrder(productName){
         //Count of the products which are displayed//
         const productCount=await this.allProducts.count(); 
         console.log("No. of products which are dsplayed in cart is : "+productCount);
         //PlaceOrder
         await this.allProducts.filter({hasText:productName}).getByRole('button',{name:'Add to Cart'}).click();
         console.log(`Product name: '${productName}' is added to the cart`);

         

    }

    async navigateTocart(){

        await this.cartButton.click();

    }
}

module.exports={DashBoardPage}