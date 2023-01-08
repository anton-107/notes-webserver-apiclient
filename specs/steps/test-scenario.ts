import assert from "assert";

import { APIClient, HttpResponse } from "../../src/api-client";

export class TestScenario {
  private client = new APIClient();
  private lastResponse: HttpResponse<object>;

  public async authorizeClient(login: string, password: string) {
    this.client.authorize(login, password);
  }

  public async callAction(actionName: string) {
    switch (actionName) {
      case "createNotebook":
        this.lastResponse = await this.client.createNotebook();
    }
  }

  public async checkResponseCode(httpCode: string) {
    assert.equal(httpCode, this.lastResponse.httpCode);
  }
}
