const mysql = require("mysql2");
const fs = require("fs");
const bcrypt = require("bcryptjs");
var randomEmail = require("random-email");

const seedQuery = fs.readFileSync("seed.sql", { encoding: "utf-8" });

//connect to the database

const connection = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "covidweb",
});
connection.connect();

const psw = Math.random().toString(36).substring(2);
const hash = bcrypt.hashSync(psw, 10);
const mail = randomEmail({ domain: "gmail.com" });
console.log("Running SQL seed");
//run the query
connection.query(seedQuery, [mail, hash], (err) => {
  if (err) {
    throw err;
  }
  console.log("Seed successful! Mail: " + mail + " Password: " + psw);
  connection.end();
});
