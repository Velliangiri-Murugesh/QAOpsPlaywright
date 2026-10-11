Feature: Testing E2E Scenario for Ecomm site
@E2EValidations
  Scenario: E2E Delete Orders
    Given I login into "https://rahulshettyacademy.com/client/#/auth/login" and Login with valud "areyouserious@yopmail.com" and "Admin@123"
    When on dashboard page, I add product into the Cart
    When on MyOrders page I delete all the orders. 
    
