import {Page,Locator} from '@playwright/test'
export class LoginPage {
  page:Page;
  username:Locator;
  password:Locator;
  signIn:Locator;

  constructor(page:Page) {
    this.page = page;
    this.username=page.getByPlaceholder('email@example.com');
    this.password=page.getByPlaceholder('enter your passsword');
    this.signIn=page.getByRole('button',{name:'login'});

  }

  async login(userName:string,password:string) {

    await this.username.fill(userName);
    await this.password.fill(password);
    console.log( await this.username.inputValue());
    await this.signIn.click({delay:5000});
    await this.page.waitForLoadState('networkidle');

  }

  async goTo(url:string) {

    await this.page.goto(url,{waitUntil:'load'});
  
}

}
