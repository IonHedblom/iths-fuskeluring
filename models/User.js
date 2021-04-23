const sqlite = require('sqlite3');
const db = new sqlite.Database("database/fuskeluring.db");

const getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {

    db.all("SELECT * FROM users WHERE email=(?)", email, function (error, row) {
      if (error) {
        reject(error);
      } else {
        resolve(row[0]);
      }
    })
  });
}

const getUserByID = (id) => {
  return new Promise((resolve, reject) => {

    db.all("SELECT * FROM users WHERE id=(?)", id, function (error, row) {
      if (error) {
        reject(error);
      } else {
        resolve(row[0]);
      }
    })
  });
}

const updateUserPassword = (id, newPassword) => {
  return new Promise((resolve, reject) => {
    const input = [newPassword, id];
    db.run(`UPDATE users SET password = ? WHERE id = ?`, input, function (error) {
      if (error) {
        reject(error);
      } else {
        resolve('Password Updated');
      }
    });
  });
}

module.exports = { getUserByEmail, getUserByID, updateUserPassword };