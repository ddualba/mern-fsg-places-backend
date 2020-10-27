const e = require('express');
const { v4: uuidv4 } = require('uuid');
const HttpError = require('../models/http-error');

const DUMMY_USERS = [
  {
    id: 'u1',
    name: 'Max Schwarz',
    email: 'test@test.com',
    password: 'testers'
  }
];

const getAllUsers = (req, res, next) => {
  res.json({ users: DUMMY_USERS });
};

const signup = (req, res, next) => {
  const { name, email, password } = req.body;

  const hasUser = DUMMY_USERS.find((u) => u.email === email);
  if (hasUser) {
    throw new HttpError('Could not create user, email already exists', 422); // 422 unvalid user input
  }

  const createdUser = {
    id: uuidv4(),
    name,
    email,
    password
  };

  DUMMY_USERS.push(createdUser);

  res.status(201).json({ user: createdUser }); // code 201 because new data added/created
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  const identifiedUser = DUMMY_USERS.find((u) => u.email === email);
  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError(
      'Could not identify user, credentials seem to be wrong.',
      404
    );
  }

  res.json({ message: 'Logged in!' });
};

exports.getAllUsers = getAllUsers;
exports.signup = signup;
exports.login = login;
