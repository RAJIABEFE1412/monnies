
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
});var User = mongoose.model('users', UserSchema);
// module.exports = {User};
const signup = async (req, res, next) => {
    console.log(req.body);

    const {
        username,
        email,
        pwd,
        type
    } = req.body;
    try {
        console.log(username);
        let user = await User.findOne({
            email
        });
        if (user) {

            return res.status(400).json({
                msg: "User Already Exists"
            });
        }

        user = new User({
            email: email,
            username: username,

            password: pwd,
            userType: type,
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(pwd, salt);

        await user.save();
        if (type == "Investor") {
            res.redirect('/profile/'+email+'/'+user.username)
        } else {
            res.redirect('/dashboard/'+email+'/'+username)
        }



    } catch (err) {
        console.log(err.message);
        res.status(500).send("Error in Saving");
    }

}

const login = async (req, res, next) => {

    // const errors = validationResult(req);

    // if (!errors.isEmpty()) {
    //     return res.status(400).json({
    //         errors: errors.array()
    //     });
    // }

    const { email, password } = req.body;
    try {
        console.log(req.body);
        let user = await User.findOne({
            email: email
        });

        if (!user)
            // return res.status(400).json({
            //     message: "User Not Exist"
            // });
            return    res.redirect('/login');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({
                message: "Incorrect Password !"
            });

        if (user.userType == "Investor") {
            res.redirect('/profile/'+email+'/'+user.username)
        } else {
            res.redirect('/dashboard/'+email+'/'+user.username)
        }
        // const payload = {
        //     user: {
        //         id: user.id
        //     }
        // };

        // jwt.sign(
        //     payload,
        //     "randomString",
        //     {
        //         expiresIn: 3600
        //     },
        //     (err, token) => {
        //         if (err) throw err;
        //         res.status(200).json({
        //             token
        //         });
        //     }
        // );
    } catch (e) {
        console.error(e);
        res.redirect('/login');
    }




}


module.exports = {
    signup,
    login,
}
