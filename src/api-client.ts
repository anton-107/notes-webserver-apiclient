import fetch from "node-fetch";

interface Notebook {
  name: string;
}

export interface HttpResponse<T> {
  httpCode: number;
  body: T | undefined;
}

export class APIClient {
  public async authorize(login: string, password: string): Promise<boolean> {
    const response = await fetch(`api-endpoint-address`, {});
    console.log(
      "Trying to authorize: ",
      login,
      "using password of length",
      password.length,
      response
    );
    return false;
  }
  public async createNotebook(): Promise<HttpResponse<Notebook>> {
    return {
      httpCode: 0,
      body: undefined,
    };
  }
}
