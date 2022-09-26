const { Schema, model } = require('mongoose');
const searchSchema = require('./Search');
const dateFormat = require('../utils/dateFormat');
// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const bookSchema = new Schema({
  authors: [
    {
      type: String,
    },
  ],
  description: {
    type: String,
    required: true,
  },
  
  // saved book id from GoogleBooks
  bookId: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  link: {
    type: String,
  },
  },
  {
  toJSON: {
    getters: true
  }
}
);

bookSchema.virtual('bookCount').get(function() {
  return this.options.length;
});


const Book = model('Book', bookSchema);
module.exports = bookSchema;
