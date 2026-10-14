Feature: Testing E2E Scenario for Ecomm site
@E2EValidations
  Scenario: E2E Validation of Ecom
    Given I login into "https://rahulshettyacademy.com/client/#/auth/login" and Login with valud "bajajpulsar@yopmail.com" and "Admin@123"
    When on dashboard page, I add product into the Cart
    Then I naviagte to cart Page
    Then I click on Checkout button
    Then I enter all the details in "4444223100001141" ,"12","12","369","Eddy","rahulshettyacademy" Payment method page and click on Place order.
    When on OrderConfirmation page I verify the order details
    Then on MyOrders page I delete all the orders. 
    
