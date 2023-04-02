import assert from "assert";

import { APIClient } from "../../src/api-client.js";

export class TestScenario {
  private client = new APIClient();
  private lastResponseHttpCode: number | undefined = undefined;
  private lastNotebookID: string | undefined = undefined;
  private lastNoteID: string | undefined = undefined;

  public async authorizeClient(login: string, password: string) {
    await this.client.authorize(login, password);
  }

  public async callAction(actionName: string) {
    let resp;
    switch (actionName) {
      case "createNotebook":
        resp = await this.client.createNotebook(
          "This notebook is created programmatically"
        );
        if (resp && resp.body) {
          this.lastNotebookID = resp.body["id"];
        }
        this.lastResponseHttpCode = resp.httpCode;
        break;
      case "createNote":
        await this.createNote();
        break;
      case "updateNote":
        await this.uodateNote();
        break;
      case "createNotes":
        await this.callCreateNotes();
        break;
      case "listNotebooks":
        resp = await this.client.listNotebooks();
        this.lastResponseHttpCode = resp.httpCode;
        break;
      case "listNotes":
        if (!this.lastNotebookID) {
          throw Error(
            "[Test scenario] Can not list notes without a notebook id"
          );
        }
        resp = await this.client.listNotes(this.lastNotebookID);
        this.lastResponseHttpCode = resp.httpCode;
        break;
      case "deleteNotebook":
        if (!this.lastNotebookID) {
          throw Error(
            "[Test scenario] Can not delete a notebook without a notebook id"
          );
        }
        resp = await this.client.deleteNotebook(this.lastNotebookID);
        this.lastResponseHttpCode = resp.httpCode;
        break;
      default:
        throw Error(
          `[Test scenario] Call action is not supported by test scenario: ${actionName}`
        );
    }
  }
  private async createNote() {
    if (!this.lastNotebookID) {
      throw Error(
        "[Test scenario] Can not create a note without a notebook id"
      );
    }
    const resp = await this.client.createNote(
      this.lastNotebookID,
      "This note is created programmatically"
    );
    if (resp && resp.body) {
      this.lastNoteID = resp.body["id"];
    }
    this.lastResponseHttpCode = resp.httpCode;
  }
  private async uodateNote() {
    if (!this.lastNoteID) {
      throw Error(
        "[Test scenario] Can not update a note without an existing note id"
      );
    }
    const resp = await this.client.updateNote(this.lastNoteID, {
      "note-content": "This note was updated programmatically",
    });
    this.lastResponseHttpCode = resp.httpCode;
  }
  public checkResponseCode(httpCode: string) {
    assert.equal(httpCode, String(this.lastResponseHttpCode));
  }

  private async callCreateNotes(): Promise<void> {
    if (!this.lastNotebookID) {
      throw Error(
        "[Test scenario] Can not create a note without a notebook id"
      );
    }
    const resp = await this.client.createNotes([
      {
        id: "",
        notebookID: this.lastNotebookID,
        content: "This note #1 is created programmatically",
      },
      {
        id: "",
        notebookID: this.lastNotebookID,
        content: "This note #2 is created programmatically",
      },
      {
        id: "",
        notebookID: this.lastNotebookID,
        content: "This note #3 is created programmatically",
      },
    ]);
    this.lastResponseHttpCode = resp.httpCode;
  }
}
