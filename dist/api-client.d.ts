import { Note } from "notes-model/dist/note-model.js";
import { Notebook } from "notes-model/dist/notebook-model.js";
export interface NoteType {
    type: string;
}
export type FormBody = {
    [key: string]: unknown;
};
export interface NoteForm extends FormBody {
    "note-type"?: string;
    "note-id"?: string;
    "notebook-id"?: string;
    "note-content"?: string;
    "note-section"?: string;
    "note-manual-order"?: string;
    "table-columns"?: {
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
    updateNote(noteID: string, formBody?: NoteForm): Promise<HttpResponse<Note>>;
    listNotebooks(): Promise<HttpResponse<Notebook[]>>;
    listNotes(notebookID: string): Promise<HttpResponse<Note[]>>;
    private sendGetRequest;
    private sendPostRequest;
    private parseNotebookResponse;
}
