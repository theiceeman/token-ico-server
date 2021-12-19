const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();

//MYSQL CONNECTION

let db_config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: "",
  database: process.env.DB_NAME,
};

const sqlConnection = mysql.createPool(db_config);
// Attempt to catch disconnects
sqlConnection.on("connection", function (connection) {
  console.log("DB Connection established");

  connection.on("error", function (err) {
    console.error(new Date(), "MySQL error", err.code);
  });
  connection.on("close", function (err) {
    console.error(new Date(), "MySQL close", err);
  });
});

module.exports = sqlConnection;
