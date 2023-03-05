export interface Notebook {
    id: string;
    name: string;
}
export interface NoteType {
    type: string;
}
export type FormBody = {
    [key: string]: string;
};
export interface NoteForm extends FormBody {
    "note-type"?: string;
    "notebook-id"?: string;
    "note-content"?: string;
}
export interface Note {
    id: string;
    notebookID: string;
    content: string;
    type: NoteType;
    extensionProperties?: {
        [key: string]: string;
    };
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
    createNote(notebookID: string, noteContent: string, formBody?: NoteForm): Promise<HttpResponse<Note>>;
    createNotes(notes: NoteForm[]): Promise<HttpResponse<void>>;
    listNotes(notebookID: string): Promise<HttpResponse<Note[]>>;
    private sendGetRequest;
    private sendPostRequest;
    private parseNotebookResponse;
}
