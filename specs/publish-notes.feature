Feature: Publish notes via API client

  Scenario: Create a notebook
    Given I am logged in as 'user1' / '1234'
    When I call 'createNotebook' action
    Then I get '200' http code in response

  Scenario: List notebooks
    When I call 'listNotebooks' action
    Then I get '200' http code in response
  
  Scenario: Create a note
    When I call 'createNote' action
    Then I get '200' http code in response
  
  Scenario: Update a note
    When I call 'updateNote' action
    Then I get '200' http code in response
  
  Scenario: Create multiple notes
    When I call 'createNotes' action
    Then I get '201' http code in response

  Scenario: List notes
    When I call 'listNotes' action
    Then I get '200' http code in response

  Scenario: Delete a notebook
    When I call 'deleteNotebook' action
    Then I get '200' http code in response