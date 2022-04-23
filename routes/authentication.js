'use strict';

const { Router } = require('express');

const bcryptjs = require('bcryptjs');
const User = require('./../models/user');
const mailTransporter = require('./../mail-service');
const fileUpload = require('./../middleware/file-upload');

const router = new Router();

router.get('/sign-up', (req, res, next) => {
  res.render('sign-up');
});

router.post('/sign-up', fileUpload.single('picture'), (req, res, next) => {
  const { name, email, password } = req.body;

  let picture;
  if (req.file) picture = req.file.path;

  bcryptjs
    .hash(password, 10)
    .then((hash) => {
      return User.create({
        name,
        email,
        passwordHashAndSalt: hash,
        picture
      });
    })
    .then((user) => {
      req.session.userId = user._id;

      return mailTransporter.sendMail({
        from: `"Meower" ${process.env.EMAIL_SENDER}`,
        to: user.email,
        subject: 'Welcome',
        text: 'Welcome to the Meower'
      });
    })
    .then(() => {
      res.redirect(`/profile/${req.session.userId}`);
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/sign-in', (req, res, next) => {
  res.render('sign-in');
});

router.post('/sign-in', (req, res, next) => {
  let user;
  const { email, password } = req.body;
  User.findOne({ email })
    .then((document) => {
      if (!document) {
        return Promise.reject(new Error("There's no user with that email."));
      } else {
        user = document;
        return bcryptjs.compare(password, user.passwordHashAndSalt);
      }
    })
    .then((result) => {
      if (result) {
        req.session.userId = user._id;
        res.redirect(`/profile/${req.session.userId}`);
      } else {
        return Promise.reject(new Error('Wrong password.'));
      }
    })
    .catch((error) => {
      next(error);
    });
});

router.post('/sign-out', (req, res, next) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
