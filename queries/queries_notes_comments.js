
function QueriesNotesComments(dbConnection) {
  
  /**
   * GET ALL
   */

  this.getNotesComments = () => {
    return new Promise((resolve, reject) => {
      dbConnection.query('SELECT * FROM notes_comments', (err, rows) => {
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
  
  this.getNotesCommentsById = (id) => {
    return new Promise((resolve, reject) => {
      dbConnection.query('SELECT * FROM notes_comments WHERE id = ?', id, (err, rows) => {
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
  
  this.getNotesCommentsByIdNote = (idNote) => {
    return new Promise((resolve, reject) => {
      dbConnection.query('SELECT * FROM notes_comments WHERE id_note = ?', id, (err, rows) => {
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



}

module.exports = QueriesUsers