const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "data");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, "locationdata.json");
  },
});
const upload = multer({ storage: storage });

const networkAdress = "http://192.168.1.3:3000";
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

app.post("/uploadFileAPI", upload.single("file"), (req, res) => {
  storeJSON();
  console.log("test");
  res.send("File Uploaded");
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

//Admin Login API

app.post("/adminlogin", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    db.query(
      "SELECT * FROM admin WHERE username= ?", //Each user has unique password
      username,
      (err, result) => {
        if (err) {
          res.send({ err: err });
        }
        if (typeof result === "undefined") {
          throw new Error("Database not mounted"); //Fix error - What happens when db is offline
        }
        if (result.length > 0) {
          if (password === result[0].password) {
            req.session.user = result;
            console.log(req.session.user);
            res.send(result);
          } else {
            res.send({ message: "Wrong username/password combination" });
          }
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
//Get cases history
app.post("/caseshistory", (req, res) => {
  const user_id = req.body.user_id;
  db.query(
    "SELECT DATE_RECORDED FROM cases WHERE USER_ID = ?",
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

//Function that stores JSON file in the db. Used by admin
function storeJSON() {
  const testData = require("./data/locationData.json");
  testData.forEach((poi) => {
    db.query(
      "SELECT * FROM locations WHERE id = ?",
      [poi.id],
      (err, result) => {
        if (err) {
          console.log(err);
        }
        if (result.length > 0) {
          db.query(
            "UPDATE locations SET types = ? ,populartimes = ? WHERE id = ?",
            [
              JSON.stringify(poi.types),
              JSON.stringify(poi.populartimes),
              poi.id,
            ],
            (err, result) => {
              if (err) {
                console.log(err);
              } else {
                console.log("POI Update successfull");
              }
            }
          );
        } else {
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
              } else {
                console.log("POI inserted");
              }
            }
          );
        }
      }
    );
  });
}

//Function that handles the registration of a new covid case, takes in the id of the user and the date in format: "2022-09-12"
function newCovidCase(user_id, date) {
  //"2022-09-12" date format "yyyy-mm-dd"
  //First of all we insert the user that got sick in the cases table
  db.query(
    "INSERT INTO `cases` (USER_ID,DATE_RECORDED) VALUES (?,?)",
    [user_id, date],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        db.query(
          // Get the Location_IDs from the places the user visited in the last 7 days
          "SELECT LOCATION_ID,date_format(TIMESTAMP, '%Y-%m-%d %H:%i:%s') as TIMESTAMP FROM visits WHERE TIMESTAMP >= DATE(? - INTERVAL 7 day) AND USER_ID= ?",
          [date, user_id],
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
//Gets all the users that where in the same location in a 4 hour window(-+2hours) from the time the verified case was there
function getPossibleInteractions(locationId, datetime, user_id) {
  //querys to the the db are nested to avoid async problems
  db.query(
    "SELECT DISTINCT USER_ID, LOCATION_ID, date_format(TIMESTAMP, '%Y-%m-%d %H:%i:%s') as DATE FROM `visits` WHERE TIMESTAMP BETWEEN DATE_sub(?, INTERVAL 2 hour) AND DATE_ADD(?, INTERVAL 2 hour)",
    [datetime, datetime], //datetime format: '2022-09-10 20:04:00','2022-09-10 20:18:56'
    (err, interactions) => {
      if (err) {
        console.log(err);
      } else {
        //Filter the user that got sick out from the interactions array
        interactions = interactions.filter((visit) => {
          if (visit.USER_ID === user_id) {
            return false;
          } else {
            return true;
          }
        });

        interactions.forEach((visit) => {
          console.log(visit.USER_ID);
          console.log(visit.LOCATION_ID);
          console.log(visit.DATE);
          db.query(
            "INSERT INTO `possibleinteractions` (USER_ID,LOCATION_ID,DATE_OF_VISIT) VALUES (?,?,?)",
            [visit.USER_ID, visit.LOCATION_ID, visit.DATE], //'2022-09-10 20:04:00','2022-09-10 20:18:56'
            (err, result) => {
              if (err) {
                console.log(err);
              } else {
                console.log("DB updated successfully");
              }
            }
          );
        });
      }
    }
  );
}

//ενα fun που θα παιρνει ολα τα visits που εκανε τις τελευταιες 7 μερες αυτος που δηλωσε
//και τρεξε για το καθε visit το get possible case, μαζεψε ολους του χρηστες και βαλτους σε ενα table possiblecases
//οταν συνδεεσαι θα ελεγχει αν ειναι σε αυτο το table

//Get busyness from time (120min)
app.get("/busys", (req, res) => {
  db.query(
    "SELECT  AVG(busyness)  FROM   busyness WHERE timestamp >= NOW() - INTERVAL 2 DAY"
  );
});

app.post("/covid", (req, res) => {
  const user_id = req.body.user_id;
  const date = req.body.date;
  //db.query("UPDATE covid SET hascovid = IF(DATEDIFF(DAY,NOW(),timestamp)>=14,TRUE,FALSE) WHERE userId = (?)",
  newCovidCase(user_id, date);
});
//

//Admin APIs

app.get("/totalCases", (req, res) => {
  db.query("SELECT count(*) as cases FROM visits", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send({ cases: result[0].cases });
    }
  });
});

app.get("/totalVisits", (req, res) => {
  db.query("SELECT count(*) as visits FROM visits", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send({ visits: result[0].visits });
    }
  });
});

app.get("/totalVisitsByCases", (req, res) => {
  db.query(
    "SELECT count(*) as visitsbycases FROM visits INNER JOIN cases ON cases.USER_ID = visits.USER_ID WHERE visits.TIMESTAMP BETWEEN DATE_SUB(DATE_RECORDED,INTERVAL 7 DAY) AND DATE_ADD(DATE_RECORDED, INTERVAL 14 DAY)",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send({ visitsByCases: result[0].visitsbycases });
      }
    }
  );
});

app.get("/getTypeScores", (req, res) => {
  let types = [];
  db.query(
    'SELECT JSON_EXTRACT(types,"$") as types FROM `locations`',
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        result.forEach((typeSet) => {
          typeSet.types = JSON.parse(typeSet.types);
          types = types.concat(typeSet.types);
        });
        types.sort();
        let i = 0;
        let j = 0;
        let typeScore = [];
        while (i < types.length) {
          typeScore[j] = { type: types[i], score: 1 };
          while (types[i] === types[i + 1]) {
            typeScore[j].score++;
            i++;
          }
          i++;
          j++;
        }
        typeScore.sort((a, b) => {
          return b.score - a.score;
        });
        res.send(typeScore);
      }
    }
  );
});

app.get("/getTypeScoresByCases", (req, res) => {
  let types = [];
  db.query(
    'SELECT JSON_EXTRACT(types,"$") as types FROM `visits` INNER JOIN `cases` ON visits.USER_ID = cases.USER_ID INNER JOIN `locations` ON visits.LOCATION_ID = locations.ID WHERE visits.TIMESTAMP BETWEEN DATE_SUB(DATE_RECORDED,INTERVAL 7 DAY) AND DATE_ADD(DATE_RECORDED, INTERVAL 14 DAY);',
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        result.forEach((typeSet) => {
          typeSet.types = JSON.parse(typeSet.types);
          types = types.concat(typeSet.types);
        });
        types.sort();
        let i = 0;
        let j = 0;
        let typeScore = [];
        while (i < types.length) {
          typeScore[j] = { type: types[i], score: 1 };
          while (types[i] === types[i + 1]) {
            typeScore[j].score++;
            i++;
          }
          i++;
          j++;
        }
        typeScore.sort((a, b) => {
          return b.score - a.score;
        });
        res.send(typeScore);
      }
    }
  );
});

//APIs For Charts

app.post("/getVisitCountPerDay", (req, res) => {
  const interval = req.body.interval;
  const date = req.body.date;
  if (interval === "month") {
    db.query(
      "SELECT count(*) as visits, date_format(TIMESTAMP, '%Y-%m-%d') as date FROM visits WHERE MONTH(visits.TIMESTAMP) = MONTH(?) GROUP BY DAY(TIMESTAMP) ",
      [interval],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log(result);
        }
      }
    );
  }
  if (interval === "week") {
    db.query(
      "SELECT count(*) as visits, date_format(TIMESTAMP, '%Y-%m-%d') as date FROM visits WHERE WEEK(visits.TIMESTAMP) = WEEK(?) GROUP BY DAY(TIMESTAMP) ",
      [date],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log(result);
        }
      }
    );
  }
});

app.post("/getVisitByCasesCountPerDay", (req, res) => {
  const interval = req.body.interval;
  const date = req.body.date;
  if (interval === "month") {
    db.query(
      "SELECT count(*) as visits, date_format(TIMESTAMP, '%Y-%m-%d') as date FROM `visits` INNER JOIN `cases` ON visits.USER_ID = cases.USER_ID INNER JOIN `locations` ON visits.LOCATION_ID = locations.ID  WHERE MONTH(visits.TIMESTAMP) = MONTH(?) GROUP BY DAY(TIMESTAMP) ",
      [interval],
      (err, result) => {
        if (err) {
          res.send(err);
        } else {
          res.send(result);
        }
      }
    );
  }
  if (interval === "week") {
    db.query(
      "SELECT count(*) as visits, date_format(TIMESTAMP, '%Y-%m-%d') as date FROM `visits` INNER JOIN `cases` ON visits.USER_ID = cases.USER_ID INNER JOIN `locations` ON visits.LOCATION_ID = locations.ID WHERE WEEK(visits.TIMESTAMP) = WEEK(?) GROUP BY DAY(TIMESTAMP) ",
      [date],
      (err, result) => {
        if (err) {
          res.send(err);
        } else {
          res.send(result);
        }
      }
    );
  }
});

function getVisitByCasesCountPerDay(interval, date) {
  if (interval === "month") {
    db.query(
      "SELECT count(*) as visits, date_format(TIMESTAMP, '%Y-%m-%d') as date FROM `visits` INNER JOIN `cases` ON visits.USER_ID = cases.USER_ID INNER JOIN `locations` ON visits.LOCATION_ID = locations.ID  WHERE MONTH(visits.TIMESTAMP) = MONTH(?) GROUP BY DAY(TIMESTAMP) ",
      [interval],
      (err, result) => {
        if (err) {
          res.send(err);
        } else {
          res.send(result);
        }
      }
    );
  }
  if (interval === "week") {
    db.query(
      "SELECT count(*) as visits, date_format(TIMESTAMP, '%Y-%m-%d') as date FROM `visits` INNER JOIN `cases` ON visits.USER_ID = cases.USER_ID INNER JOIN `locations` ON visits.LOCATION_ID = locations.ID WHERE WEEK(visits.TIMESTAMP) = WEEK(?) GROUP BY DAY(TIMESTAMP) ",
      [date],
      (err, result) => {
        if (err) {
          res.send(err);
        } else {
          res.send(result);
        }
      }
    );
  }
}

app.listen(3001, () => {
  console.log("Server running in port 3001");
  getVisitCountPerDay("week", "22-9-13");
});
