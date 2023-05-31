Feature: Example Feature

  Scenario: Adding1
    When I add 2 and 3
    Then I get 5

  Scenario: Adding2
    When I add 1 and 1000000
    Then I get 1000001

  Scenario: Webpage Test
	Given User navigates to 'parabank' website
	