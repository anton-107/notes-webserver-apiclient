Feature: Publish notes via API client

  Scenario: Create a notebook
    Given I am logged in as 'user1' / '1234'
    When I call 'createNotebook' action
    Then I get '200' http code in response
  
  Scenario: Create a note
    When I call 'createNote' action
    Then I get '200' http code in response

  Scenario: Delete a notebook
    When I call 'deleteNotebook' action
    Then I get '200' http code in response