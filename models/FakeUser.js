const faker = require('faker');


const generateFakeUser = () => {
  const randomBirthDay = Math.floor(Math.random() * 7) + 1;
  const randomBirthMonth = Math.floor(Math.random() * 12) + 1;
  const randomBirthYear = Math.floor(Math.random() * (2014 - 1945) + 1945);
  const birthdate = `${randomBirthDay}/${randomBirthMonth}/${randomBirthYear}`;

  const fakeUser = {
    name: faker.name.findName(),
    address: {
      zip: faker.address.zipCode(),
      street: faker.address.streetName(),
      city: faker.address.city()
    },
    profession: faker.name.jobTitle(),
    birthdate: birthdate,
    personalTrait: faker.hacker.phrase(),
    picture: faker.image.avatar(),
  }

  return fakeUser;
}

module.exports = { generateFakeUser };