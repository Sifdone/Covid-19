const mysql = require("mysql2");
const fs = require("fs");
const bcrypt = require("bcryptjs");

const seedQuery = fs.readFileSync("seedvisits.sql", { encoding: "utf-8" });

//connect to the database

const connection = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "covidweb",
});
connection.connect();

function setValue(value) {
  locationId = value[0].ID;
  console.log(typeof locationId);
}

let locationId = "";

function insertVisits() {
  connection.query(
    "INSERT INTO visits (USER_ID,LOCATION_ID) VALUES (?,?)",
    [randomnumber, locationId],
    (err) => {
      if (err) {
        throw err;
      }
      console.log(
        "Seed successful! UserID: " +
          randomnumber +
          " LocationId: " +
          locationId
      );
      connection.end();
    }
  );
}

maximum = 20;
minimum = 1;
var randomnumber =
  Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;

connection.query(
  "SELECT ID FROM locations ORDER BY RAND() LIMIT 1",
  function (err, rows) {
    if (err) {
      throw err;
    } else {
      setValue(rows);
      insertVisits();
    }
  }
);


