Feature: Ecommesre validation


 Scenario: Placing the order
  
    Given Login to Ecommerse application with "ramenk@gmail.com" And "King@123"
    When Add "zara coat 3" to cart
    Then Verify "zara coat 3" added to cart
    When Enter the valid details and place the order
    Then Verify the order is present in OrderHistory page 
   