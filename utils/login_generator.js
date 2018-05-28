const requireQueriesUsersLogin = require('../queries/queries_users_login')

function loginGenerator(dbConnection) {

  this.generateUniqueLogin = (firstname, lastname) => {
    return new Promise((resolve, reject) => {

      var queriesUsersLogin = new requireQueriesUsersLogin(dbConnection)
      var newLogin = (lastname.substring(0,10) + '_' + firstname.substring(0,1)).toLowerCase()

      queriesUsersLogin.getAllLoginFromUsersLogin()
        .then((existingLogins) => {

          for (i = 0; i < existingLogins.length; i++) {
            existingLogins[i] = existingLogins[i].login
          }
          
          while (existingLogins.includes(newLogin)) {
            newLogin = newLogin.slice(0, -1);
            newLogin += Math.random().toString(36).slice(-1);
          }
          newLogin = newLogin.toLowerCase()
          resolve(newLogin)
        })
        .catch((err) => {
          reject(err);
        })

    })
  };

}

module.exports = loginGenerator