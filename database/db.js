const sqlite = require('sqlite3').verbose();

const db = new sqlite.Database('fuskeluring.db');

const hashPasswords = require('../pwhash/hashPasswords')


const generateUsers = () => {
  const password1 = hashPasswords('grillkorv123');
  const password2 = hashPasswords('bananpaj1337');
  const password3 = hashPasswords('sötsursås42');
  const initialUsers = [
    {
      email: 'stabbing.steve@fuskeluring.hack',
      password: password1
    },
    {
      email: 'murdering.mike@fuskeluring.hack',
      password: password2
    },
    {
      email: 'crimes.johnsson@fuskeluring.hack',
      password: password3
    }
  ]

  return initialUsers;
}



const insertUsers = async () => {
  const initialUsers = await generateUsers();
  db.serialize(() => {
    db.run(`CREATE TABLE users ("id"    INTEGER,"email"    TEXT,"password"    TEXT,PRIMARY KEY("id" AUTOINCREMENT));`);
    db.run('INSERT INTO users (email,password) VALUES (?, ?)', initialUsers[0].email, initialUsers[0].password);
    db.run('INSERT INTO users (email,password) VALUES (?, ?)', initialUsers[1].email, initialUsers[1].password);
    db.run('INSERT INTO users (email,password) VALUES (?, ?)', initialUsers[2].email, initialUsers[2].password);
  });
}

insertUsers();

module.exports = db;
