const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  cart: [
    {
      id: {
        type: Number,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      category: {
        type: String,
        required: true,
      },
      brand: {
        type: String,
      },
      price: {
        type: Number,
        required: true,
      },
      images: {
        type: [String],
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      }
    }
  ],
 purchasedProducts: [
    {
      id: {
        type: Number,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      category: {
        type: String,
        required: true,
      },
      brand: {
        type: String,
      },
      price: {
        type: Number,
        required: true,
      },
      images: {
        type: [String],
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      purchaseDate: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

const User = mongoose.model('User' , userSchema , 'users');
module.exports = User;


