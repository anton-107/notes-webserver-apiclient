Feature: Publish notes via API client

  Scenario: Create a notebook
    Given I am logged in as 'user1' / '1234'
    When I call 'createNotebook' action
    Then I get '201' http code in response