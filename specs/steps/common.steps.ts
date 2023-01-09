import { Given, Then, When } from "@cucumber/cucumber";

import { TestScenario } from "./test-scenario.js";

const testScenario = new TestScenario();

Given(
  "I am logged in as {string} \\/ {string}",
  async (login: string, password: string) => {
    await testScenario.authorizeClient(login, password);
  }
);

When("I call {string} action", async (actionName: string) => {
  await testScenario.callAction(actionName);
});

Then("I get {string} http code in response", function (httpCode: string) {
  testScenario.checkResponseCode(httpCode);
});
