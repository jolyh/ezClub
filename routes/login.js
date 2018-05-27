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

router.get('/:login/:pwd', (req, res) => {

  var login = req.params.login
  var pwd = req.params.pwd

  console.log("login " + login + " - password " + pwd)

  var salt = bcrypt.genSaltSync(10);
  var hashpass = bcrypt.hashSync(pwd, salt);

  var queriesUsersLogin = new requireQueriesUsersLogin(req.con)
  var queriesUsers = new requireQueriesUsers(req.con)

  queriesUsersLogin.getUserLoginByLoginAndPassword(login, hashpass)
    .then((userLogin) => {
        return(queriesUsers.getUserById(result[0].id))
    })
    .then((user) => {
      res.json(user)
    })
    .catch((err) => {
      res.json(err);
    })
});

module.exports = router;