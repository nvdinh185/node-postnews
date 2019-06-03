const excel_db = require('./db/sqlite3/excel-sqlite-service');

const excelFilename = "./db/news-setting.xlsx"; //ten file excel cau hinh
const dbFilename = "./db/news-database.db";      //ten database muon tao

excel_db.Excel2Sqlite.createDatabase(excelFilename, dbFilename);
