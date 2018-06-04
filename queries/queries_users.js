
function QueriesUsers(dbConnection) {
  
  /**
   * SELECT
   */

  this.getUsers = () => {
    return new Promise((resolve, reject) => {
      dbConnection.query('SELECT * FROM users ORDER BY id DESC', (err, rows) => {
        if (err) {
          reject(err)
        }
        resolve(rows)
      })
    })
  };

  this.getUserById = (id) => {
    return new Promise((resolve, reject) => {
      dbConnection.query('SELECT * FROM users WHERE id = ?', id, (err, rows) => {
        if (err) {
          reject(err)
        }
        if (rows[0]) {
          resolve(rows)
        }
        reject({error : "Error: no corresponding result"})
      })
    })
  };

  this.getUserByIdAndAuthorization = (id, type) => {
    return new Promise((resolve, reject) => {

      var query = 'SELECT * FROM users WHERE id = ' + id + 
        ' AND authorization_note' + type + ' = 1';

      dbConnection.query(query, (err, rows) => {
        if (err) {
          reject(err)
        }
        if (rows[0]) {
          resolve(rows)
        }
        reject({error : "Error: no corresponding result"})
      })
    })
  };

  // idType = [auth1, auth2, auth3, auth4, auth...] - auth being + or 1
  this.getUserByIdAndAuthorizations = (id, idTypes) => {
    return new Promise((resolve, reject) => {

      var query = 'SELECT * FROM users WHERE id = ' + id + 
        ' AND ';
      idTypes.forEach(element, index => {
        query += 'authorization_note' + (index +1) + ' = ' + element; 
      });

      dbConnection.query(query, (err, rows) => {
        if (err) {
          reject(err)
        }
        if (rows[0]) {
          resolve(rows)
        }
        reject({error : "Error: no corresponding result"})
      })
    })
  };

  this.getUserByFirstnameLastname = (firstname, lastname) => {
    return new Promise((resolve, reject) => {
      dbConnection.query('SELECT * FROM users WHERE firstname = ? AND lastname = ?', firstname, lastname, (err, rows) => {
        if (err) {
          reject(err)
        }
        if (rows[0]) {
          resolve(rows)
        }
        reject({error : "Error: no corresponding result"})
      })
    })
  };

  this.getUsersAdmin = () => {
    return new Promise((resolve, reject) => {
      dbConnection.query('SELECT * FROM users WHERE admin = 1 ORDER BY id DESC', (err, rows) => {
        if (err) {
          reject(err)
        }
        resolve(rows)
      })
    })
  };

  this.getUseAdminById = (id) => {
    return new Promise((resolve, reject) => {
      dbConnection.query('SELECT * FROM users WHERE id = ? AND admin = 1', id, (err, rows) => {
        if (err) {
          reject(err)
        }
        if (rows[0]) {
          resolve(rows)
        }
        reject({error : "Error: no corresponding result"})
      })
    })
  };

  /**
   * INSERT INTO
   */

  this.insertIntoUsers = (user_set) => {
    return new Promise((resolve, reject) => {
      dbConnection.query('INSERT INTO users set ? ', user_set, (err, rows) => {
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

    this.updateUsersBySetId = (user_set, id) => {
      return new Promise((resolve, reject) => {
        dbConnection.query('UPDATE users set ? WHERE id = ?', [user_set, id], (err, rows) => {
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

    this.deleteUserById = (id) => {
      return new Promise((resolve, reject) => {
        dbConnection.query('DELETE FROM users WHERE id = ?', id, (err, rows) => {
          if (err) {
            reject(err);
          }
          resolve(rows)
        })
      })
    };

}

module.exports = QueriesUsers