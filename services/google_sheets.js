const { google } = require("googleapis");

const {
  GOOGLE_CLIENT_EMAIL,
  GOOGLE_PRIVATE_KEY,
  SHEET_ID,
  TAB_NAME,
} = require("../config/env");
const logger = require("../utils/logger");

const PRIVATE_KEY = GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n");
const range = "A:D";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

class GoogleSheetsService {
  async #getAuthToken() {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: GOOGLE_CLIENT_EMAIL,
        private_key: PRIVATE_KEY,
      },
      scopes: SCOPES,
    });

    const authToken = await auth.getClient();

    return google.sheets({
      version: "v4",
      auth: authToken,
    });
  }

  async #writeSheet(googleSheetClient, SHEET_ID, TAB_NAME, data) {
    return await googleSheetClient.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: `${TAB_NAME}!${range}`,
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      resource: {
        majorDimension: "ROWS",
        values: data,
      },
    });
  }

  async newEntry(dataToBeInserted) {
    try {
      const auth = await this.#getAuthToken();

      const { data } = await this.#writeSheet(
        auth,
        SHEET_ID,
        TAB_NAME,
        dataToBeInserted
      );

      logger.info("google-sheet-update %o", data.updates);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = GoogleSheetsService;
