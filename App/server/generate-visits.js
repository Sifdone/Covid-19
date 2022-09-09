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
var someVar = [];

connection.query(
  "SELECT ID FROM locations ORDER BY RAND() LIMIT 1",
  function (err, rows) {
    if (err) {
      throw err;
    } else {
      setValue(rows);
    }
  }
);

function setValue(value) {
  someVar = value[0].ID;
  console.log(someVar);
}
maximum = 20;
minimum = 16;
var randomnumber =
  Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
//run the query
connection.query(seedQuery, [randomnumber, someVar.toString()], (err) => {
  if (err) {
    throw err;
  }
  console.log(
    "Seed successful! UserID: " + randomnumber + " LocationId: " + someVar
  );
  connection.end();
});
