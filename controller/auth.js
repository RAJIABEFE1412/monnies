
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

// const User = require("../schemas/Users").User;
var mongoose = require('mongoose');

var CouponSchema =  new mongoose.Schema({amount:{type:Number},string:{type:String},})

var User = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  coupon:{
    CouponSchema
  },
  userType:{
    type: String,
    default: "Investor"

  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});
// var User = mongoose.model('users', UserSchema);
// module.exports = {User};
const signup = async (req, res, next) => {
    console.log(req.body);

    const {
        username,
        email,
        pwd,
        type
    } = req
