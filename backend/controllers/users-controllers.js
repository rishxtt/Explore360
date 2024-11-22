const HttpError = require('../models/http-error');

const {validationResult} = require('express-validator');
const User = require('../models/user'); 


const getUsers = async (req, res, next) => {
    let users
    try{

        users = await User.find({}, '-password');
    } catch(err) {
        const error = new HttpError(
            'Fetching users failed, please try again later.',
            500
        );
        return next(error);
    }
    res.json({users: users.map(user => user.toObject({ getters: true }))});
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
    const{ name, email, password } = req.body;

    let existingUser;
    try {
      existingUser = await User.findOne({ email: email })
    } catch (err) {
      const error = new HttpError(
        'Signing up failed, please try again later.',
        500
      );
      return next(error);
    }

    if (existingUser) {
        const error = new HttpError(
            'User exists already, please login instead.',
            422
        );
        return next(error);
    }

    const createdUser = new User({
        name,
        email,
        image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngegg.com%2Fen%2Fsearch%3Fq%3Duser&psig=AOvVaw3XIkSBlOs0cU9Gufplpwkd&ust=1723022781457000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCOjDgbaG4IcDFQAAAAAdAAAAABAE',
        password,
        places: []
    });

    try {
        await createdUser.save();
      } catch (err) {
        const error = new HttpError(
          "Signing up failed, please try again.",
          500
        );
        return next(error);
      }
    

    res.status(201).json({user: createdUser.toObject({ getters: true })});
};

const login = async (req, res, next) => {
    const{email, password} = req.body;

    let existingUser;
    try {
      existingUser = await User.findOne({ email: email })
    } catch (err) {
      const error = new HttpError(
        'Logging in failed, please try again later.',
        500
      );
      return next(error);
    }

    if(!existingUser || existingUser.password !== password) {
        const error = new HttpError(
            'Invalid credentials, could not log you in.',
            401
        );
        return next (error);
    }



    res.json({message: 'Logged in!'});
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;