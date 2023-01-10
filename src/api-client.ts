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
  public async createNotebook(): Promise<HttpResponse<Notebook>> {
    // const response = await fetch(`${process.env.API_ROOT}/notebook`, {
    //   method: "post",
    //   headers: {
    //     "Content-Type": "application/json",
    //     // "Cookie": cookie.serialize('Authentication', this.authenticationToken),
    //   },
    //   body: JSON.stringify({
    //     "notebook-name": "This notebook is created programmatically",
    //   }),
    // });
    // const responseHeaders = response.headers;
    // const statusCode = response.status;

    // console.log("createNotebook resp", statusCode, responseHeaders);

    return {
      httpCode: 0,
      body: undefined,
    };
  }
}
