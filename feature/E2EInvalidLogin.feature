Feature: Testing E2E Scenario for Ecomm site
  @ErrorValidation
  Scenario Outline: : E2E Invalid Login
    Given I login into "https://rahulshettyacademy.com/client/#/auth/login" and Login with valud "<userName>" and "<Password>"
    Then I verify error message displayed for invalid login.
    Examples:
      | userName                 | Password |
      |areyouserious@yopmail.com | Admin@1  |
      |areyouserious@yopmails.com | 9952250012  |
