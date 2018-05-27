const express = require('express');
const router = express.Router();

const requireQueriesUsers = require('../queries/queries_users')

router.get('/', (req, res) => {

  const queriesUsers = new requireQueriesUsers(req.con)

  queriesUsers.getUsers()
    .then((users) => {
      res.json(users)
    })
    .catch((err) => {
      res.json(err);
    })

});

router.get('/:id', (req, res) => {

  const queriesUsers = new requireQueriesUsers(req.con)

  queriesUsers.getUserById(req.params.id)
    .then((user) => {
      res.json(user)
    })
    .catch((err) => {
      res.json(err);
    })

});

// body to create user -> firstname, lastname, job (optionel), email
router.post('/add', (req, res) => {
  
  console.log(req.body)
  req.body = JSON.parse(JSON.stringify(req.body));

  const queriesUsers = new requireQueriesUsers(req.con)

  queriesUsers.insertIntoUsers(req.body)
    .then((userCreated) => {
      res.json(userCreated)
    })
    .catch((err) => {
      res.json(err);
    })
})

router.get('/delete/:id', (req, res) => {
  
  const queriesUsers = new requireQueriesUsers(req.con)

  queriesUsers.deleteUserById(req.params.id)
    .then((result) => {
      res.json(result)
    })
    .catch((err) => {
      res.json(err);
    })
})

module.exports = router;