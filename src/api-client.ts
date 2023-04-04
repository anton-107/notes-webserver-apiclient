import cookie from "cookie";
import { Note } from "notes-model/dist/note-model.js";
import { Notebook } from "notes-model/dist/notebook-model.js";

export interface NoteType {
  type: string;
}

export type FormBody = { [key: string]: unknown };

export interface NoteForm extends FormBody {
  "note-type"?: string;
  "note-id"?: string;
  "notebook-id"?: string;
  "note-content"?: string;
  "note-section"?: string;
  "note-manual-order"?: string;
  "table-columns"?: { [key: string]: string };
}

export interface HttpResponse<T> {
  httpCode: number;
  body: T | undefined;
}

export class APIClient {
  private authenticationToken: string | undefined = undefined;

  public async authorize(login: string, password: string): Promise<boolean> {
    const response = await fetch(`${process.env.API_ROOT}/signin`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "user-login": login,
        "user-password": password,
      }),
    });
    const responseHeaders = response.headers;
    const statusCode = response.status;

    if (statusCode !== 200) {
      return false;
    }

    const cookies = cookie.parse(responseHeaders.get("set-cookie"));
    if (!cookies["Authentication"]) {
      return false;
    }

    this.authenticationToken = cookies["Authentication"];
    return true;
  }
  public async createNotebook(
    notebookName: string
  ): Promise<HttpResponse<Notebook>> {
    const response = await this.sendPostRequest(
      "/notebook",
      JSON.stringify({
        "notebook-name": notebookName,
      })
    );
    return await this.parseNotebookResponse(response);
  }
  public async deleteNotebook(
    notebookID: string
  ): Promise<HttpResponse<Notebook>> {
    const response = await this.sendPostRequest(
      "/delete-notebook",
      JSON.stringify({
        "notebook-id": notebookID,
      })
    );
    return await this.parseNotebookResponse(response);
  }
  public async createNote(
    notebookID: string,
    noteContent: string,
    formBody: NoteForm = {}
  ): Promise<HttpResponse<Note>> {
    const response = await this.sendPostRequest(
      "/note",
      JSON.stringify({
        "notebook-id": notebookID,
        "note-content": noteContent,
        ...formBody,
      })
    );

    const httpCode = response.status;

    if (httpCode !== 200) {
      return {
        httpCode,
        body: undefined,
      };
    }
    const body = await response.json();

    return {
      httpCode,
      body: body as Note,
    };
  }
  public async createNotes(notes: NoteForm[]): Promise<HttpResponse<void>> {
    const response = await this.sendPostRequest(
      "/note",
      JSON.stringify({
        notes: notes.map((n) => {
          return {
            "notebook-id": n.notebookID,
            "note-content": n.content,
            ...n,
          };
        }),
      })
    );

    const httpCode = response.status;

    if (httpCode !== 200) {
      return {
        httpCode,
        body: undefined,
      };
    }
    const body = await response.json();

    return {
      httpCode,
      body,
    };
  }
  public async updateNote(
    noteID: string,
    formBody: NoteForm = {}
  ): Promise<HttpResponse<Note>> {
    const response = await this.sendPostRequest(
      `/note/${noteID}/edit`,
      JSON.stringify({
        "note-id": noteID,
        ...formBody,
      })
    );

    const httpCode = response.status;

    if (httpCode !== 200) {
      return {
        httpCode,
        body: undefined,
      };
    }
    const body = await response.json();

    return {
      httpCode,
      body: body as Note,
    };
  }

  public async listNotebooks(): Promise<HttpResponse<Notebook[]>> {
    const response = await this.sendGetRequest("/notebook");
    const httpCode = response.status;

    if (httpCode !== 200) {
      return {
        httpCode,
        body: undefined,
      };
    }
    const body: { notebooks: Notebook[] } = await response.json();

    return {
      httpCode,
      body: body.notebooks,
    };
  }
  public async listNotes(notebookID: string): Promise<HttpResponse<Note[]>> {
    const response = await this.sendGetRequest(`/notebook/${notebookID}/note`);
    const httpCode = response.status;

    if (httpCode !== 200) {
      return {
        httpCode,
        body: undefined,
      };
    }
    const body: { notes: Note[] } = await response.json();

    return {
      httpCode,
      body: body.notes,
    };
  }

  private async sendGetRequest(path: string): Promise<Response> {
    const serializedCookie = cookie.serialize(
      "Authentication",
      this.authenticationToken
    );
    return await fetch(`${process.env.API_ROOT}${path}`, {
      method: "get",
      headers: {
        "content-type": "application/json",
        cookie: serializedCookie,
      },
    });
  }
  private async sendPostRequest(path: string, body: string): Promise<Response> {
    const serializedCookie = cookie.serialize(
      "Authentication",
      this.authenticationToken
    );
    return await fetch(`${process.env.API_ROOT}${path}`, {
      method: "post",
      headers: {
        "content-type": "application/json",
        cookie: serializedCookie,
      },
      body,
    });
  }
  private async parseNotebookResponse(
    response: Response
  ): Promise<{ httpCode: number; body: Notebook | undefined }> {
    const httpCode = response.status;
    if (httpCode !== 200) {
      return {
        httpCode,
        body: undefined,
      };
    }
    const body = await response.json();

    return {
      httpCode,
      body: body as Notebook,
    };
  }
}
