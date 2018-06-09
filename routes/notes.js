const express = require('express');
const router = express.Router();

const requireQueriesUsers = require('../queries/queries_users')
const requireQueriesNotes = require('../queries/queries_notes')
const requireQueriesNotesComments = require('../queries/queries_notes_comments')

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

  queriesNotes.getNoteById(req.params.id)
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

  console.log(body.id_user + " - " + body.id_type)
  queriesUsers.getUserByIdAndAuthorization(body.id_user, body.id_type)
    .then((user) => {
      console.log(body)
      return queriesNotes.getNoteByIdAndIdUser(body.id, body.id_user)
    })
    .then((note) => {
      console.log(note)
      return queriesNotes.updateNotesBySetId(body, body.id)
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

/**
 * GET NOTES EXTENDED
 */

router.get('/extended/:id', (req, res) => {

  console.log("/extended + id -> " + req.params.id)

  var queriesNotes = new requireQueriesNotes(req.con)
  var queriesNotesComments = new requireQueriesNotesComments(req.con)

  var result = {
    note : undefined,
    comments : undefined
  }

  queriesNotes.getNoteById(req.params.id)
  .then((note) => {
    console.log(note[0])
    result.note = note[0]
    return queriesNotesComments.getNotesCommentsByIdNote(req.params.id)
  })
  .then((comments) => {
    console.log(comments)
    result.comments = comments
    res.json(result)
  })
    .catch((err) => {
      res.json(err)
    })
});


/**
 * ADD NOTE COMMENT
 */

// body to create note -> idUser, idType, content
router.post('/extended/add', (req, res) => {

  var body = JSON.parse(JSON.stringify(req.body))

  var queriesUsers = new requireQueriesUsers(req.con)
  var queriesNotes = new requireQueriesNotes(req.con)
  var queriesNotesComments = new requireQueriesNotesComments(req.con)

  var newComment = {
    id_note: body.id_note,
    creator_name: body.creator_name,
    content: body.content
  }

  queriesUsers.getUserByIdAndAuthorization(body.id_user, body.id_type)
    .then((user) => {
      body.creator_name = user[0].lastname + ' ' + user[0].firstname
      return queriesNotesComments.insertIntoNotesComments(newComment)
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
router.post('/extended/edit/', (req, res) => {

  var body = JSON.parse(JSON.stringify(req.body))
  var note = undefined

  var queriesUsers = new requireQueriesUsers(req.con)
  var queriesNotes = new requireQueriesNotes(req.con)
  var queriesNotesComments = new requireQueriesNotesComments(req.con)

  queriesNotes.getNoteById(req.params.id)
    .then((notes) => {
      note = notes[0]
      return queriesUsers.getUserByIdAndAuthorization(body.id_user, note.id_type)
    })
    .then((user) => {
      console.log(body)
      return queriesNotes.getNoteByIdAndIdUser(req.params.id, body.id_user)
    })
    .then((note) => {
      console.log(note)
      return queriesNotes.updateNotesCommentsBySetId(body, body.id)
    })
    .then((result) => {
      res.json(result)
    })
    .catch((err) => {
      res.json(err)
    })
});

module.exports = router;