import cookie from "cookie";
import fetch from "node-fetch";

interface Notebook {
  name: string;
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
    const serializedCookie = cookie.serialize(
      "Authentication",
      this.authenticationToken
    );
    const response = await fetch(`${process.env.API_ROOT}/notebook`, {
      method: "post",
      headers: {
        "content-type": "application/json",
        cookie: serializedCookie,
      },
      body: JSON.stringify({
        "notebook-name": notebookName,
      }),
    });
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
