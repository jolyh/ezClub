const express = require('express');
const router = express.Router();

function QueriesUsers(dbConnection) {
  
  /**
   * SELECT
   */

  this.getUsers = () => {
    return new Promise((resolve, reject) => {
      dbConnection.query('SELECT * FROM users', (err, rows) => {
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