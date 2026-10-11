
interface response{
    token:any;
    orderid:any;


}
export class ApiUtilsTS{

    apiRequest:any;
    loginPayload:any;


    constructor(apiRequest:any,loginPayload:any){

        this.apiRequest=apiRequest;
        this.loginPayload=loginPayload;

    }

    async getToken(){

        const loginResponse=await this.apiRequest.post("https://rahulshettyacademy.com/api/ecom/auth/login",{
        
                data:this.loginPayload
        
            });
               
            const loginResponsePayload=await loginResponse.json();
            let token=await loginResponsePayload.token;
            console.log(token);
            return token;
        

    }


    async placeOrder(PlaceorderRequestPayload:any){

        let response: response = { token:"", orderid:"" };
        response.token=await this.getToken();

        const orderResponsePayload=await this.apiRequest.post("https://rahulshettyacademy.com/api/ecom/order/create-order",{
    
            data:PlaceorderRequestPayload,
            headers:{
    
                 'Authorization':response.token,
                 'content-Type':'application/json',
                 'ignoreHTTPSErrors':'true'
            }
        })
    
        const orderRequestPayloadJson=await orderResponsePayload.json();
        console.log(orderRequestPayloadJson);
        let orderid=orderRequestPayloadJson.orders[0];
        console.log(orderid)
        response.orderid=orderid;
        return response;


    }


    async deleteOrder(orderid:any,token:any){

        
        const deleteOrderResponse=await this.apiRequest.delete((`https://rahulshettyacademy.com/api/ecom/order/delete-order/${orderid}`),{

            
        headers:{ 

             'Authorization':token,
             'content-Type':'application/json',
             'ignoreHTTPSErrors':'true'
        }

    });

        const con=await deleteOrderResponse.json();
        const message=await con.message;
        return message;






}
}