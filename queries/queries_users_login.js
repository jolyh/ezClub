
function QueriesUsersLogin(dbConnection) {
  
  /**
   * GET ALL
   */

  this.getUsersLogin = () => {
    return new Promise((resolve, reject) => {
      dbConnection.query('SELECT * FROM users_login ORDER BY id DESC', (err, rows) => {
        if (err) {
          reject(err)
        }
        resolve(rows)
      })
    })
  };


  /**
   * GET FROM
   */

  this.getAllLoginFromUsersLogin = () => {
    return new Promise((resolve, reject) => {
      dbConnection.query('SELECT login FROM users_login', (err, rows) => {
        if (err) {
          reject(err)
        }
        resolve(rows)
      })
    })
  };

  /**
   * GET BY
   */

  this.getUserLoginByIdUser = (idUser) => {
    return new Promise((resolve, reject) => {
      dbConnection.query('SELECT * FROM users_login WHERE id_user = ?', idUser, (err, rows) => {
        if (err) {
          reject(err)
        }
        if (rows != undefined && rows[0]) {
          resolve(rows[0])
        }
        reject({error : "Error: no corresponding result"})
      })
    })
  };

  this.getUserLoginByLogin = (login) => {
    return new Promise((resolve, reject) => {
      dbConnection.query('SELECT * FROM users_login WHERE login = ?', login, (err, rows) => {
        if (err) {
          reject(err)
        }
        if (rows != undefined && rows[0]) {
          resolve(rows[0])
        }
        reject({error : "Error: no corresponding result"})
      })
    })
  };

  this.getUserLoginByLoginAndPassword = (login, password) => {
    return new Promise((resolve, reject) => {
      dbConnection.query('SELECT * FROM users_login WHERE login = ? AND password = ?', 
      [login, password], (err, rows) => {
        if (err) {
          reject(err)
        }
        if (rows != undefined && rows[0]) {
          resolve(rows[0])
        }
        reject({error : "Error: no corresponding result"})
      })
    })
  };

  /**
   * INSERT INTO
   */

  this.insertIntoUsersLogin = (user_set) => {
    return new Promise((resolve, reject) => {
      dbConnection.query('INSERT INTO users_login set ? ', user_set, (err, rows) => {
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

    this.updateUsersLoginBySetId = (user_set, id) => {
      return new Promise((resolve, reject) => {
        dbConnection.query('UPDATE users_login set ? WHERE id = ?', [user_set, id], (err, rows) => {
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

    this.deleteUserLoginById = (id) => {
      return new Promise((resolve, reject) => {
        dbConnection.query('DELETE FROM users_login WHERE id = ?', id, (err, rows) => {
          if (err) {
            reject(err);
          }
          resolve(rows)
        })
      })
    };

    this.deleteUserLoginByIdUser = (idUser) => {
      return new Promise((resolve, reject) => {
        dbConnection.query('DELETE FROM users_login WHERE id_user = ?', idUser, (err, rows) => {
          if (err) {
            reject(err);
          }
          resolve(rows)
        })
      })
    };

}

module.exports = QueriesUsersLogin