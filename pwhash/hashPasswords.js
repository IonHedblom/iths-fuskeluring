const bcrypt = require('bcryptjs');


const hashPasswords = (password) => {
  const hash = bcrypt.hashSync(password, 10);
  return hash;
}

module.exports = hashPasswords;