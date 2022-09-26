const { AuthenticationError } = require('apollo-server-express');
const { User, Book} = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('books')
          .populate('savedBooks');
        
        return userData;
      }

      throw new AuthenticationError('Not logged in');
    },
    users: async () => {
      return User.find()
        .select('-__v -password')
        .populate('books')
        .populate('savedBooks');
       
    },
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password')
        .populate('savedBooks')
        .populate('books');
    },
    books: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Book.find(params).sort({ createdAt: -1 });
    },
    book: async (parent, { _id }) => {
      return Book.findOne({ _id });
    }
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    login: async (body, { email, password }) => {
      const user = await User.findOne({ username, email, password });
     
      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(body.password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },

    addBook: async ({user, body, }, res) => {
        const updateBook = await Book.create({ ...args, username: context.user.username });

        await User.findByIdAndUpdate(
          { _id: user._id },
          { $addToSet: { addBooks: body } },
          { new: true, runValidators: true }
        );
        return res.json(addBook);
        return res.status(400).json(err);
      
    },

    saveBook: async ({ user, body }, res, context) => {
      if (context.user) {
        const updatedsaveBook = await saveBook.findOneAndUpdate(
          { _id: savedbookId },
          { $push: { saveBooks: { saveBookBody, username: context.user.username } } },
          { new: true, runValidators: true }
        );

        return updatedsaveBook;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
    
    deleteBook: async ({ user, params }, res) => {
     
        const updatedUser = await User.findOneAndUpdate(
          { _id: user._id },
          { $pull: { savedBooks: { bookId: params.bookId } } },
          { new: true }
        );
    
      if (!updatedUser) {
        return res.status(404).json({ message: "Couldn't find user with this id!" });
      }
      return res.json(updatedUser);
    
    }
  }
};

  
module.exports = resolvers;
