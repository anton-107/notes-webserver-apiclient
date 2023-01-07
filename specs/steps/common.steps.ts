import {Given, When, Then} from "@cucumber/cucumber";
import {APIClient} from "../../src/api-client";

Given('I am logged in as {string} \\/ {string}', function (login: string, password: string) {
  // Write code here that turns the phrase above into concrete actions
  const client = new APIClient;
  console.log('client', client);
  return true;
});

When('I call {string} action', function (actionName: string) {
  // Write code here that turns the phrase above into concrete actions
  return true;
});

Then('I get {string} http code in response', function (httpCode: string) {
  // Write code here that turns the phrase above into concrete actions
  return true;
});