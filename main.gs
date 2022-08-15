const SPREADSHEET_URL = "GOOGLE_DOCS_SPREADSHEET_URL";

const FORMS = [
  {
    dataUrl: "KOBO_JSON_URL",
    name: "example"
  },
];

function main() {
  Logger.log("main");
  const spreadSheet = SpreadsheetApp.openByUrl(SPREADSHEET_URL);
  _.forEach(FORMS, (form, index) => processForm(form, spreadSheet, index));
}
