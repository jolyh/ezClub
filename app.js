/*  REQUIRE  */
const express = require('express')
const path = require('path')

const bodyParser = require('body-parser')
//const cookieParser = require('cookie-parser');

/*  Database REQUIRE */
const con = require('./config/database')

/* Extra file option */
const fs = require('fs');

/*  File upload and download and form  */
const multer = require('multer');
const upload = multer({
  dest: 'public/files'
});

/*  brute force protection, request limiter  */
var rateLimit = require('express-rate-limit');

/*  Mail module REQUIRE */
const nodemailer = require('nodemailer');

/*  Routes REQUIRE  */
const users = require('./routes/users')
const login = require('./routes/login')
const notes = require('./routes/notes')

/*  Init app */
const app = express();

// Make our db accessible to our router
app.use((req, res, next) => {
  req.con = con

  const origin = req.get('origin');

  // TODO Add origin validation
  res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, Pragma');
  
  // intercept OPTIONS method
  if (req.method === 'OPTIONS') {
    res.sendStatus(204)
  } else {
    next()
  }
});

/*  Middleware  */
// parse application/json
app.use(bodyParser.json())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

/*  brute force protection, request limiter  */
app.enable('trust proxy'); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc)

var limiter = new rateLimit({
 windowMs: 15*60*1000, // 15 minutes
 max: 100, // limit each IP to 100 requests per windowMs
 delayMs: 0 // disable delaying - full speed until the max limit is reached
});
//  apply to all requests
app.use(limiter)

/*  set Public Folder to access ressources  */
app.use(express.static(path.join(__dirname, 'public')))

/*  Route use */
app.use('/users', users)
app.use('/login', login)
app.use('/notes', notes)

app.get('/', (req,res) => {
  res.json({message : 'Welcome to the back-end'})
});

// 404 Page
app.use(function(req, res, next) {
  res.status(404).json({message : '404 Not Found'})
});

// set the port of our application
var port = process.env.PORT || 3000

// Start server
app.listen(port, () => {
  console.log('App listening on port ' + port)
});
