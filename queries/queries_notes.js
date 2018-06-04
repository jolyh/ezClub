
function QueriesNotes(dbConnection) {
  
  /**
   * GET ALL
   */

  this.getNotes = () => {
    return new Promise((resolve, reject) => {
      dbConnection.query('SELECT * FROM notes ORDER BY id DESC', (err, rows) => {
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
      dbConnection.query('SELECT * FROM notes WHERE id = ? ORDER BY id DESC', id, (err, rows) => {
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

  this.getNotesByIdType = (idType) => {
    return new Promise((resolve, reject) => {
      dbConnection.query('SELECT * FROM notes WHERE id_type = ? ORDER BY id DESC', idType, (err, rows) => {
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
      dbConnection.query('SELECT * FROM notes WHERE creator_name = ? ORDER BY id DESC', creator, (err, rows) => {
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

  this.insertIntoNotes = (noteSet) => {
    return new Promise((resolve, reject) => {
      dbConnection.query('INSERT INTO notes set ? ', noteSet, (err, rows) => {
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

  this.updateNotesBySetId = (noteSet, id) => {
    return new Promise((resolve, reject) => {
      dbConnection.query('UPDATE notes set ? WHERE id = ?', [noteSet, id], (err, rows) => {
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