const FakeUser = require('../models/FakeUser');

const FakeUserController = async (req, res) => {
  try {
    const createdFakeUser = FakeUser.generateFakeUser();

    res.json(createdFakeUser);
  } catch (err) {
    console.error(err);
  }
}

module.exports = FakeUserController;