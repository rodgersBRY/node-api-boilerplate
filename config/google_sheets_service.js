const { google } = require("googleapis");

const {
  GOOGLE_CLIENT_EMAIL,
  GOOGLE_PRIVATE_KEY,
  SHEET_ID,
  TAB_NAME,
} = require("../config/env");

const PRIVATE_KEY = GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n");
const range = "A:D";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

const getAuthToken = async () => {
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
};

const _writeGoogleSheet = async (
  googleSheetClient,
  SHEET_ID,
  TAB_NAME,
  data
) => {
  await googleSheetClient.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: `${TAB_NAME}!${range}`,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    resource: {
      majorDimension: "ROWS",
      values: data,
    },
  });
};

async function googleSheetsService(dataToBeInserted) {
  try {
    const auth = await getAuthToken();

    await _writeGoogleSheet(auth, SHEET_ID, TAB_NAME, dataToBeInserted);
  } catch (err) {
    throw err;
  }
}

module.exports = { googleSheetsService };
