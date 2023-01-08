interface Notebook {
  name: string;
}

export interface HttpResponse<T> {
  httpCode: number;
  body: T | undefined;
}

export class APIClient {
  public async authorize(login: string, password: string): Promise<boolean> {
    console.log(
      "Trying to authorize: ",
      login,
      "using password of length",
      password.length
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
