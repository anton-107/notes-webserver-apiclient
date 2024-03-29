var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import cookie from "cookie";
export class APIClient {
    constructor() {
        this.authenticationToken = undefined;
    }
    authorize(login, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${process.env.API_ROOT}/signin`, {
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
        });
    }
    createNotebook(notebookName) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.sendPostRequest("/notebook", JSON.stringify({
                "notebook-name": notebookName,
            }));
            return yield this.parseNotebookResponse(response);
        });
    }
    deleteNotebook(notebookID) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.sendPostRequest("/delete-notebook", JSON.stringify({
                "notebook-id": notebookID,
            }));
            return yield this.parseNotebookResponse(response);
        });
    }
    createNote(notebookID, noteContent, formBody = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.sendPostRequest("/note", JSON.stringify(Object.assign({ "notebook-id": notebookID, "note-content": noteContent }, formBody)));
            const httpCode = response.status;
            if (httpCode !== 200) {
                return {
                    httpCode,
                    body: undefined,
                };
            }
            const body = yield response.json();
            return {
                httpCode,
                body: body,
            };
        });
    }
    createNotes(notes) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.sendPostRequest("/note", JSON.stringify({
                notes: notes.map((n) => {
                    return Object.assign({ "notebook-id": n.notebookID, "note-content": n.content }, n);
                }),
            }));
            const httpCode = response.status;
            if (httpCode !== 200) {
                return {
                    httpCode,
                    body: undefined,
                };
            }
            const body = yield response.json();
            return {
                httpCode,
                body,
            };
        });
    }
    updateNote(noteID, formBody = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.sendPostRequest(`/note/${noteID}/edit`, JSON.stringify(Object.assign({ "note-id": noteID }, formBody)));
            const httpCode = response.status;
            if (httpCode !== 200) {
                return {
                    httpCode,
                    body: undefined,
                };
            }
            const body = yield response.json();
            return {
                httpCode,
                body: body,
            };
        });
    }
    listNotebooks() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.sendGetRequest("/notebook");
            const httpCode = response.status;
            if (httpCode !== 200) {
                return {
                    httpCode,
                    body: undefined,
                };
            }
            const body = yield response.json();
            return {
                httpCode,
                body: body.notebooks,
            };
        });
    }
    listNotes(notebookID) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.sendGetRequest(`/notebook/${notebookID}/note`);
            const httpCode = response.status;
            if (httpCode !== 200) {
                return {
                    httpCode,
                    body: undefined,
                };
            }
            const body = yield response.json();
            return {
                httpCode,
                body: body.notes,
            };
        });
    }
    sendGetRequest(path) {
        return __awaiter(this, void 0, void 0, function* () {
            const serializedCookie = cookie.serialize("Authentication", this.authenticationToken);
            return yield fetch(`${process.env.API_ROOT}${path}`, {
                method: "get",
                headers: {
                    "content-type": "application/json",
                    cookie: serializedCookie,
                },
            });
        });
    }
    sendPostRequest(path, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const serializedCookie = cookie.serialize("Authentication", this.authenticationToken);
            return yield fetch(`${process.env.API_ROOT}${path}`, {
                method: "post",
                headers: {
                    "content-type": "application/json",
                    cookie: serializedCookie,
                },
                body,
            });
        });
    }
    parseNotebookResponse(response) {
        return __awaiter(this, void 0, void 0, function* () {
            const httpCode = response.status;
            if (httpCode !== 200) {
                return {
                    httpCode,
                    body: undefined,
                };
            }
            const body = yield response.json();
            return {
                httpCode,
                body: body,
            };
        });
    }
}
//# sourceMappingURL=api-client.js.map