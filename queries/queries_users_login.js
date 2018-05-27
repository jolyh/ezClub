const express = require('express');
const router = express.Router();

function QueriesUsersLogin(dbConnection) {
  
  this.getUsersLogin = () => {
    return new Promise((resolve, reject) => {
      dbConnection.query('SELECT * FROM users_login', (err, rows) => {
        if (err) {
          reject(err)
        }
        resolve(rows)
      })
    })
  };

  this.getUserLoginByIdUser = (idUser) => {
    return new Promise((resolve, reject) => {
      dbConnection.query('SELECT * FROM users_login WHERE id_user = ?', idUser, (err, rows) => {
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

  this.getUserLoginByLogin = (login) => {
    return new Promise((resolve, reject) => {
      dbConnection.query('SELECT * FROM users_login WHERE login = ?', login, (err, rows) => {
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

  this.getUserLoginByLoginAndPassword = (login, password) => {
    return new Promise((resolve, reject) => {
      dbConnection.query('SELECT * FROM users_login WHERE login = ? AND password = ?', 
      [login, password], (err, rows) => {
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

    this.updateUsersBySetId = (user_set, id) => {
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

    this.deleteUserById = (id) => {
      return new Promise((resolve, reject) => {
        dbConnection.query('DELETE FROM users_login WHERE id = ?', id, (err, rows) => {
          if (err) {
            reject(err);
          }
          resolve(rows)
        })
      })
    };

}

module.exports = QueriesUsersLogin