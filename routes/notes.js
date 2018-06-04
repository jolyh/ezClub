const express = require('express');
const router = express.Router();

const requireQueriesNotes = require('../queries/queries_notes')
const requireQueriesUsers = require('../queries/queries_users')

/**
 * GET ALL NOTES
 */

router.get('/', (req, res) => {

  var queriesNotes = new requireQueriesNotes(req.con)

  queriesNotes.getNotes()
    .then((notes) => {
      res.json(notes)
    })
    .catch((err) => {
      res.json(err)
    })
});

/**
 * GET NOTE BY ID
 */

router.get('/:id', (req, res) => {

  var queriesNotes = new requireQueriesNotes(req.con)

  queriesNotes.getNotesById(req.params.id)
    .then((note) => {
      res.json(note)
    })
    .catch((err) => {
      res.json(err)
    })
});

/**
 * GET NOTE BY ID Type
 */

router.get('/type/:idtype', (req, res) => {

  var queriesNotes = new requireQueriesNotes(req.con)

  queriesNotes.getNotesByIdType(req.params.idtype)
    .then((notes) => {
      res.json(notes)
    })
    .catch((err) => {
      res.json(err)
    })
});

/**
 * ADD NOTE
 */

// body to create note -> idUser, idType, content
router.post('/add', (req, res) => {

  var body = JSON.parse(JSON.stringify(req.body))

  var queriesUsers = new requireQueriesUsers(req.con)
  var queriesNotes = new requireQueriesNotes(req.con)

  queriesUsers.getUserByIdAndAuthorization(req.body.id_user, req.body.id_type)
    .then((user) => {
      console.log(user[0])
      body.creator_name = user[0].lastname + ' ' + user[0].firstname
      console.log(body)
      return queriesNotes.insertIntoNotes(req.body)
    })
    .then((result) => {
      res.json(result)
    })
    .catch((err) => {
      res.json(err)
    })
});

/**
 * EDIT NOTE
 */
router.post('/edit', (req, res) => {

  var body = JSON.parse(JSON.stringify(req.body))

  var queriesUsers = new requireQueriesUsers(req.con)
  var queriesNotes = new requireQueriesNotes(req.con)

  queriesUsers.getUserByIdAndAuthorization(req.body.id_user, req.body.id_type)
    .then((user) => {
      console.log(body)
      return queriesNotes.updateNotesBySetId(req.body.id)
    })
    .then((result) => {
      res.json(result)
    })
    .catch((err) => {
      res.json(err)
    })
});

/**
 * DELETE NOTE BY ID Type
 */

router.get('/delete/:id', (req, res) => {

  var queriesNotes = new requireQueriesNotes(req.con)

  queriesNotes.deleteNoteById(req.params.id)
    .then((result) => {
      res.json(result)
    })
    .catch((err) => {
      res.json(err)
    })
});

module.exports = router;