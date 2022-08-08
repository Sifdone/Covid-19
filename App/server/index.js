const express = require('express')
const app = express();
const mysql = require('mysql');
const cors = require("cors");
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const testData = require('./data/testData.json');


const networkAdress = "http://192.168.2.2:3000";
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
      maxAge: 60000,
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





app.listen(3001, () => {
    console.log("Server running in port 3001")
    //storeJSON();
})
//Get busyness from time (120min)
app.get("/busy", (req, res) =>{
  db.query("SELECT  AVG(busyness)  FROM   busyness WHERE timestamp >= NOW() - INTERVAL 2 DAY")
  
})

/*
function storeJSON() {
    testData.forEach((poi) => {
        db.query('INSERT INTO locations (id,name,latitude,longtitude) VALUES (?,?,?,?)',
        [poi.id,poi.name,poi.coordinates.lat,poi.coordinates.lng],
        (err, result) => {
            if(err){
                console.log(err)
            }
        }); 
    })
}
*/


