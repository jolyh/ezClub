const express = require('express');
const router = express.Router();
var bcrypt = require('bcrypt');

const requireQueriesUsers = require('../queries/queries_users')
const requireQueriesUsersLogin = require('../queries/queries_users_login')

const requireLoginGenerator = require('../utils/login_generator')

router.get('/', (req, res) => {

  var queriesUsers = new requireQueriesUsers(req.con)

  queriesUsers.getUsers()
    .then((users) => {
      res.json(users)
    })
    .catch((err) => {
      res.json(err);
    })

});

router.get('/:id', (req, res) => {

  var queriesUsers = new requireQueriesUsers(req.con)

  queriesUsers.getUserById(req.params.id)
    .then((user) => {
      res.json(user)
    })
    .catch((err) => {
      res.json(err);
    })

});

/**
 * ADD USER
 */

// body to create user -> firstname, lastname, job (optionel), email
router.post('/add', (req, res) => {

  req.body = JSON.parse(JSON.stringify(req.body))

  var queriesUsers = new requireQueriesUsers(req.con)
  var queriesUsersLogin = new requireQueriesUsersLogin(req.con)
  var loginGenerator = new requireLoginGenerator(req.con)

  var plainNewPassword = (Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)).substring(0,10)
  
  var newUserLogin = {
    'id_user' : undefined,
    'login': undefined,
    'password' : undefined,
    'email' : req.body.email
  }
  var newUser 

  queriesUsers.insertIntoUsers(req.body)
    .then((userCreated) => {
      newUser = userCreated
      newUserLogin.id_user = userCreated.insertId
      console.log(newUserLogin)
      return bcrypt.hash(plainNewPassword, 10)
    })
    .then((hashPassword) => {
      console.log("plain " + plainNewPassword + " - " + hashPassword)
      newUserLogin.password = hashPassword
      return loginGenerator.generateUniqueLogin(req.body.firstname, req.body.lastname)
    })
    .then((loginGenerated) => {
      newUserLogin.login = loginGenerated
      return queriesUsersLogin.insertIntoUsersLogin(newUserLogin)
    })
    .then((userLoginCreated) => {
      res.json(newUser)
    })
    .catch((err) => {
      res.json(err)
    });
})

/**
 * EDIT USER
 */

router.post('/edit/:id', (req, res) => {

  req.body = JSON.parse(JSON.stringify(req.body))

  var queriesUsers = new requireQueriesUsers(req.con)

  queriesUsers.updateUsersBySetId(req.body, req.params.id)
    .then((result) => {
      res.json(result)
    })
    .catch((err) => {
      res.json(err)
    });
})

/**
 * DELETE USER
 */

router.get('/delete/:id', (req, res) => {
  
  var queriesUsers = new requireQueriesUsers(req.con)
  var queriesUsersLogin = new requireQueriesUsersLogin(req.con)

  queriesUsersLogin.deleteUserLoginByIdUser(req.params.id)
    .then(queriesUsers.deleteUserById(req.params.id))
    .then((result) => {
      res.json(result)
    })
    .catch((err) => {
      res.json(err)
    });
})

module.exports = router;