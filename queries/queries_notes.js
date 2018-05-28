
function QueriesNotes(dbConnection) {
  
  /**
   * GET ALL
   */

  this.getNotes = () => {
    return new Promise((resolve, reject) => {
      dbConnection.query('SELECT * FROM notes', (err, rows) => {
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
  
  this.getNotesById = (id) => {
    return new Promise((resolve, reject) => {
      dbConnection.query('SELECT * FROM notes WHERE id = ?', id, (err, rows) => {
        if (err) {
          reject(err)
        }
        else if (rows[0]) {
          resolve(rows)
        }
        reject({error : "Error: no corresponding result"})
      })
    })
  };

  /**
   * GET BY IDTYPE
   */

  this.getNotesByIdType = (id_type) => {
    return new Promise((resolve, reject) => {
      dbConnection.query('SELECT * FROM notes WHERE id_type = ?', id_type, (err, rows) => {
        if (err) {
          reject(err)
        }
        resolve(rows)
      })
    })
  };

  /**
   * GET BY CREATOR
   */

  this.getNotesByCreator = (creator) => {
    return new Promise((resolve, reject) => {
      dbConnection.query('SELECT * FROM notes WHERE creator_name = ?', creator, (err, rows) => {
        if (err) {
          reject(err)
        }
        resolve(rows)
      })
    })
  };

  /**
   * INSERT INTO
   */

  this.insertIntoNotes = (note_set) => {
    return new Promise((resolve, reject) => {
      dbConnection.query('INSERT INTO notes set ? ', note_set, (err, rows) => {
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

  this.updateNotesBySetId = (note_set, id) => {
    return new Promise((resolve, reject) => {
      dbConnection.query('UPDATE notes set ? WHERE id = ?', [note_set, id], (err, rows) => {
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

  this.deleteNoteById = (id) => {
    return new Promise((resolve, reject) => {
      dbConnection.query('DELETE FROM notes WHERE id = ?', id, (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows)
      })
    })
  };

}

module.exports = QueriesNotes