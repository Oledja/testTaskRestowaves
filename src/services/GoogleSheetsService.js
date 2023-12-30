import { google } from "googleapis";

export class GoogleSheetsService {
    #auth;
    #client;
    #spreadsheetId

    constructor(credentialsFile, spreadsheetId) {
        this.#auth = new google.auth.GoogleAuth({
            keyFile: credentialsFile,
            scopes: "https://www.googleapis.com/auth/spreadsheets",
        });
        this.#client = this.#auth.getClient();
        this.#spreadsheetId = spreadsheetId;
    }

    getSheets = async () => {
        try {
            const googleSheets = google.sheets({ version: "v4", auth: this.#client });
            const { data: { sheets } } = await googleSheets.spreadsheets.get({
                auth: this.#auth,
                spreadsheetId: this.#spreadsheetId
            });
            
            return sheets.map(s => s.properties.title);
        } catch (error) {
            throw error;
        }
    };

    getRows = async (range) => {
        try {
            const googleSheets = google.sheets({ version: "v4", auth: this.#client });
            const { data: { values } } = await googleSheets.spreadsheets.values.get({
                auth: this.#auth,
                spreadsheetId: this.#spreadsheetId,
                range
            });
            
            return values;
        } catch (error) {
            throw error;
        }
    }
}

