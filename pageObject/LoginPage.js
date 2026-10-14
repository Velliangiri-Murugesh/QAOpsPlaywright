class LoginPage {

  constructor(page) {
    this.page = page;
    this.username=page.getByPlaceholder('email@example.com');
    this.password=page.getByPlaceholder('enter your passsword');
    this.signIn=page.getByRole('button',{name:'login'});
    this.invalidError=page.getByText(' Incorrect email or password. ');

  }

  async login(userName,password) {

    await this.username.fill(userName);
    await this.password.fill(password);
    console.log( await this.username.inputValue());
    await this.signIn.click('{delay:5000}');
    await this.page.waitForLoadState('networkidle');
    

  }


  async invalidLogin(){

     const error=await this.invalidError.isVisible;
     return error;
    
  }

  async goTo() {

    await this.page.goto('https://rahulshettyacademy.com/client/#/auth/login',{waitUntil:'load'});
  
}

}
module.exports={LoginPage};