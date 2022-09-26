// const faker = require('faker');
const userSeeds = require('./userSeed.json');
const bookSeeds = require('./bookSeed.json');
const db = require('../config/connection');
const { Book, User } = require('../models');

db.once('open', async () => {
  try {
    await Book.deleteMany({});
    await User.deleteMany({});

    await User.create(userSeeds);

    for (let i = 0; i < bookSeeds.length; i++) {
      const { _id, bookAuthor } = await Book.create(bookSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: bookAuthor },
        {
          $addToSet: {
            books: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});