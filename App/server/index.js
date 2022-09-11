const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const testData = require("./data/locationData.json");

const networkAdress = "http://192.168.2.7:3000";
const saltRounds = 10; //Hashing

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", networkAdress],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "userId",
    secret: "covidweb",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1200000,
    },
  })
);

//Database details
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "covidweb",
});

//Login API
app.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    db.query(
      "SELECT * FROM users WHERE username= ?", //Each user has unique password
      username,
      (err, result) => {
        if (err) {
          res.send({ err: err });
        }
        if (typeof result === "undefined") {
          throw new Error("Database not mounted"); //Fix error - What happens when db is offline
        }
        if (result.length > 0) {
          bcrypt.compare(password, result[0].password, (error, response) => {
            if (response) {
              req.session.user = result;
              console.log(req.session.user);
              res.send(result);
            } else {
              res.send({ message: "Wrong username/password combination" });
            }
          });
        } else {
          res.send({ message: "User doens't exist" });
        }
      }
    );
  } catch (error) {
    res.send({ message: "This service is currenty down" });
  }
});

//Register API
app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }
    db.query(
      "INSERT INTO users (username,password) VALUES (?,?)",
      [username, hash],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("User Created");
        }
      }
    );
  });
});

//Alter Password
app.post("/changepass", (req, res) => {
  const user_id = req.body.user_id;
  const password = req.body.password;
  const newPassword = req.body.newPassword;

  db.query(
    "SELECT * FROM users WHERE id= ?", //Each user has unique password
    user_id,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            bcrypt.hash(newPassword, saltRounds, (err, hash) => {
              if (err) {
                console.log(err);
              }
              db.query(
                "UPDATE users SET password = ? WHERE id = ?",
                [hash, user_id],
                (err, result) => {
                  if (err) {
                    console.log(err);
                  } else {
                    res.send("Password Changed Successfully");
                  }
                }
              );
            });

            //req.session.user = result;
            //console.log(req.session.user);
            //res.send(result);
          } else {
            res.send({ message: "Wrong username/password combination" });
          }
        });
      }
    }
  );
});

//Alter Username
app.post("/changeusername", (req, res) => {
  const user_id = req.body.user_id;
  const newUsername = req.body.newUsername;

  db.query(
    "SELECT * FROM users WHERE id= ?", //Each user has unique password
    user_id,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        db.query(
          "UPDATE users SET username = ? WHERE id = ?",
          [newUsername, user_id],
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              db.query(
                "SELECT * FROM users WHERE id= ?", //Each user has unique password
                user_id,
                (err, result2) => {
                  if (err) {
                    res.send({ err: err });
                  } else {
                    req.session.user = result2;
                    console.log(req.session.user);
                    res.send(result2);
                    //res.send("Username Changed Successfully");
                  }
                }
              );
            }
          }
        );
      }
    }
  );
});

//Check Username
app.post("/usernamecheck", (req, res) => {
  const username = req.body.username;
  db.query(
    "SELECT id FROM users WHERE username = ?",
    [username],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      if (typeof result === "undefined") {
        console.log("Database not mounted"); //Fix error - What happens when db is offline
      }
      if (result.length > 0) {
        console.log(result);
        res.send(false);
      } else {
        res.send(true);
      }
    }
  );
});

//Register visit API
app.post("/visit", (req, res) => {
  const userId = req.body.user;
  const locationId = req.body.location;
  db.query(
    "INSERT INTO visits (USER_ID,LOCATION_ID) VALUES (?,?)",
    [userId, locationId],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Visit Registered");
      }
    }
  );
});

//Register Busyness API
app.post("/busy", (req, res) => {
  const busyness = req.body.busyness;
  const locationId = req.body.location;
  db.query(
    "INSERT INTO busyness (LOCATION_ID,BUSYNESS) VALUES (?,?)",
    [locationId, busyness],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Busyness Registered");
      }
    }
  );
});

//Get History API
app.post("/history", (req, res) => {
  const user_id = req.body.user_id;
  db.query(
    "SELECT LOCATION_ID, date_format(TIMESTAMP, '%Y %D %M %H:%i:%s') as TIMESTAMP, NAME, ADDRESS FROM `visits` INNER JOIN `locations` ON visits.LOCATION_ID = locations.ID WHERE USER_ID = ?",
    [user_id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//Get POIS API
app.get("/pois", (req, res) => {
  db.query(
    'SELECT id, name, address, types->"$" as types, coordinates->"$" as coordinates, populartimes->"$" as populartimes FROM `locations`',
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        result.forEach((row) => {
          row.populartimes = JSON.parse(row.populartimes);
          row.coordinates = JSON.parse(row.coordinates);
          row.types = JSON.parse(row.types);
        });
        console.log(result);
        res.send(result);
      }
    }
  );
});

function storeJSON() {
  testData.forEach((poi) => {
    db.query(
      "INSERT INTO locations (id,name,address,types,coordinates,populartimes) VALUES (?,?,?,?,?,?)",
      [
        poi.id,
        poi.name,
        poi.address,
        JSON.stringify(poi.types),
        JSON.stringify(poi.coordinates),
        JSON.stringify(poi.populartimes),
      ],
      (err, result) => {
        if (err) {
          console.log(err);
        }
      }
    );
  });
}

function getCaseVisits(user_id) {
  db.query(
    "INSERT INTO `covid`(USER_ID, COVID_CASE) VALUES (?, 1)", //Φτιαχνει user log με θετικο covid
    user_id,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        db.query(
          // παιρουμε Location ID και timestamps από τα μέρη που βρέθηκε ο χρήστης με covid της τελευταιες 7 μερες (ισως περιττό το covid_case =1)
          "SELECT LOCATION_ID , `visits`.TIMESTAMP FROM `covid` INNER JOIN `visits` ON `visits`.USER_ID = `covid`.USER_ID WHERE `covid`.COVID_CASE = 1 AND covid.USER_ID = ? AND TIMESTAMP >= NOW() - INTERVAL 7 DAY",
          user_id,
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              console.log(result);
            }
          }
        );
      }
    }
  );
}
//επιστρεφει οσους ηταν σε ενα location στη συγκεκριμενη χρονικη περιοδο
function getPossibleCases(locationId, Time) {
  //input location and time and find
  var timeFrom = new Date();
  var timeUntil = new Date();
  timeFrom.setHours(Time.getHours() - 2); //- 2hours
  timeUntil.setHours(Time.getHours() + 2); //+ 2hours
  db.query(
    "SELECT DISTINCT USER_ID FROM `visits` WHERE TIMESTAMP BETWEEN ? and ?",
    [timeFrom, timeUntil], //'2022-09-10 20:04:00','2022-09-10 20:18:56'
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    }
  );
}

//ενα fun που θα παιρνει ολα τα visits που εκανε τις τελευταιες 7 μερες αυτος που δηλωσε
//και τρεξε για το καθε visit το get possible case, μαζεψε ολους του χρηστες και βαλτους σε ενα table possiblecases
//οταν συνδεεσαι θα ελεγχει αν ειναι σε αυτο το table

app.listen(3001, () => {
  console.log("Server running in port 3001");
  //getPOIS();
  //storeJSON();
});

//Get busyness from time (120min)
app.get("/busys", (req, res) => {
  db.query(
    "SELECT  AVG(busyness)  FROM   busyness WHERE timestamp >= NOW() - INTERVAL 2 DAY"
  );
});

app.post("/covid", (req, res) => {
  const userId = req.body.user;
  const details = req.body.details;
  //db.query("UPDATE covid SET hascovid = IF(DATEDIFF(DAY,NOW(),timestamp)>=14,TRUE,FALSE) WHERE userId = (?)",
  db.query("INSERT INTO covid VALUES(?,TRUE,?,NOW())")[(userId, details)],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Covid Case Registered");
      }
    };
});
//
