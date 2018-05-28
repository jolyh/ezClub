const express = require('express');
const router = express.Router();

const requireQueriesNotes = require('../queries/queries_notes')

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
      res.json(err);
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
      res.json(err);
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
      res.json(err);
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
      res.json(err);
    })
});

module.exports = router;