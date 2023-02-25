export interface Notebook {
    id: string;
    name: string;
}
export interface Note {
    id: string;
    notebookID: string;
    content: string;
}
export interface HttpResponse<T> {
    httpCode: number;
    body: T | undefined;
}
export declare class APIClient {
    private authenticationToken;
    authorize(login: string, password: string): Promise<boolean>;
    createNotebook(notebookName: string): Promise<HttpResponse<Notebook>>;
    deleteNotebook(notebookID: string): Promise<HttpResponse<Notebook>>;
    createNote(notebookID: string, noteContent: string): Promise<HttpResponse<Note>>;
    createNotes(notes: Note[]): Promise<HttpResponse<void>>;
    private sendPostRequest;
    private parseNotebookResponse;
}
