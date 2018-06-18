
function QueriesNotesComments(dbConnection) {
  
  /**
   * GET ALL
   */

  this.getNotesComments = () => {
    return new Promise((resolve, reject) => {
      dbConnection.query('SELECT * FROM notes_comments ORDER BY id DESC', (err, rows) => {
        if (err) {
          reject(err)
        }
        resolve(rows)
      })
    })
  };

  /**
   * GET BY ID
   */
  
  this.getNoteCommentById = (id) => {
    return new Promise((resolve, reject) => {
      dbConnection.query('SELECT * FROM notes_comments WHERE id = ?', id, (err, rows) => {
        if (err) {
          reject(err)
        }
        else if (rows != undefined && rows[0]) {
          resolve(rows)
        }
        reject({error : "Error: no corresponding result"})
      })
    })
  };
  
  this.getNotesCommentsByIdNote = (idNote) => {
    return new Promise((resolve, reject) => {
      dbConnection.query('SELECT * FROM notes_comments WHERE id_note = ? ORDER BY id DESC', idNote, (err, rows) => {
        if (err) {
          reject(err)
        }
        else if (rows != undefined && rows[0]) {
          resolve(rows)
        }
        reject({error : "Error: no corresponding result"})
      })
    })
  };

  this.getNotesCommentsByIdNoteAndIdUser = (idNote, idUser) => {
    return new Promise((resolve, reject) => {
      dbConnection.query('SELECT * FROM notes_comments WHERE id_note = ? AND id_user = ? ORDER BY id DESC', [idNote, idUser], (err, rows) => {
        if (err) {
          reject(err)
        }
        else if (rows != undefined && rows[0]) {
          resolve(rows)
        }
        reject({error : "Error: no corresponding result"})
      })
    })
  };

  /**
   * INSERT INTO
   */

  this.insertIntoNotesComments = (commentSet) => {
    return new Promise((resolve, reject) => {
      dbConnection.query('INSERT INTO notes_comments set ? ', commentSet, (err, rows) => {
        if (err) {
          reject(err)
        }
        resolve(rows)
      })
    })
  };

  /**
   * UPDATE
   */ 

  this.updateNotesCommentsBySetId = (commentSet, id) => {
    return new Promise((resolve, reject) => {
      dbConnection.query('UPDATE notes_comments set ? WHERE id = ?', [commentSet, id], (err, rows) => {
        if (err) {
          reject(err)
        }
        resolve(rows)
      })
    })
  };

  /**
   * DELETE
   */

  this.deleteNotesCommentsById = (id) => {
    return new Promise((resolve, reject) => {
      dbConnection.query('DELETE FROM notes_comments WHERE id = ?', id, (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows)
      })
    })
  };

  this.deleteNoteCommentsByIdNote = (idNote) => {
    return new Promise((resolve, reject) => {
      dbConnection.query('DELETE FROM notes_comments WHERE id_note = ?', idNote, (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows)
      })
    })
  };

}

module.exports = QueriesNotesComments