const { google } = require("googleapis");

const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
const privateKey = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n');
const sheetId = process.env.SHEET_ID;
const tabName = process.env.TAB_NAME;
const range = "A:D";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

const getAuthToken = async () => {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: clientEmail,
      private_key: privateKey,
    },
    scopes: SCOPES,
  });

  const authToken = await auth.getClient();

  return google.sheets({
    version: "v4",
    auth: authToken,
  });
};

const _writeGoogleSheet = async (googleSheetClient, sheetId, tabName, data) => {
  await googleSheetClient.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: `${tabName}!${range}`,
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

    await _writeGoogleSheet(auth, sheetId, tabName, dataToBeInserted);
  } catch (err) {
    throw err;
  }
}

module.exports = { googleSheetsService };
