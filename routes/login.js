const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const requireQueriesUsers = require('../queries/queries_users')
const requireQueriesUsersLogin = require('../queries/queries_users_login')

// à désactiver
router.get('/', (req, res) => {

  var queriesUsersLogin = new requireQueriesUsersLogin(req.con)

  queriesUsersLogin.getUsersLogin()
    .then((usersLogin) => {
      res.json(usersLogin)
    })
    .catch((err) => {
      res.json(err);
    })
});

router.post('/', (req, res) => {

  var login = req.body.login
  var plainPassword = req.body.password

  console.log("login " + login + " - password " + plainPassword)

  var queriesUsersLogin = new requireQueriesUsersLogin(req.con)
  var queriesUsers = new requireQueriesUsers(req.con)

  var userId

  queriesUsersLogin.getUserLoginByLogin(login)
    .then((userLogin) => {
      userId = userLogin.id_user
      return bcrypt.compare(plainPassword, userLogin.password)
    })
    .then((result) => {
      console.log("result du compare  " + result)
      if (result == true) {
        return queriesUsers.getUserById(userId)
      } else {
        res.json({err : "Error: password does not match"})
      }
    })
    .then((userAuthenticated) => {
      res.json(userAuthenticated)
    })
    .catch((err) => {
      res.json(err);
    })
});


module.exports = router;