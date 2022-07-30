const express = require('express')
const app = express();
const mysql = require('mysql');
const cors = require("cors");
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const testData = require('./data/testData.json');


const networkAdress = "http://192.168.2.10:3000";
const saltRounds = 10;



app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000", networkAdress],
    methods: ['GET', 'POST'],
    credentials: true
}));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true}));

app.use(session({
    key: 'userId',
    secret: 'covidweb',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 600000,
    }, 

}))

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'test',
    database: 'covidweb'

});
app.get("/login", (req, res)=>{
    if(req.session.user){
        res.send({loggedIn: true, user: req.session.user});
    }else{
        res.send({loggedIn: false});
    }    
})

app.post('/login', (req, res) => {
    const username = req.body.username
    const password = req.body.password

    db.query('SELECT * FROM users WHERE username= ?', //Each user has unique password
    username,
    (err, result) => {
        if(err){
            res.send({err: err})
        }
        if(result.length > 0){
            bcrypt.compare(password, result[0].password, (error, response) => {
                if(response){
                    req.session.user = result;
                    console.log(req.session.user);
                    res.send(result);
                }else{
                    res.send({message: "Wrong username/password combination"});
                }
                
            })
        }else{
            res.send({message: "User doens't exist"});
        }
    }
    );
});

app.post('/register', (req, res) => {
    const username = req.body.username
    const password = req.body.password

    bcrypt.hash(password,saltRounds, (err, hash) => {
        if (err){
            console.log(err);
        }
        db.query('INSERT INTO users (username,password) VALUES (?,?)',
        [username,hash],
        (err, result) => {
            if(err){
                console.log(err)
            } else {
                res.send("User Created");
            }
        });    
    })
});



app.listen(3001, () => {
    console.log("Server running in port 3001")
    //storeJSON();
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


