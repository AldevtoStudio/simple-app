const express = require('express');
const User = require('./../models/user');
const routeGuard = require('./../middleware/route-guard');
const fileUpload = require('./../middleware/file-upload');
const Publication = require('./../models/publication');

const profileRouter = new express.Router();

// GET - '/profile/edit' - Loads user and renders profile edit page.
profileRouter.get('/edit', routeGuard, (req, res, next) => {
  res.render('profile/edit', { profile: req.user });
});

// POST - '/profile/edit' - Handles profile edit form submission.
profileRouter.post('/edit', routeGuard, fileUpload.single('picture'), (req, res, next) => {
  const id = req.user._id;
  const { name, email } = req.body;
  let picture;
  if (req.file) picture = req.file.path;

  User.findByIdAndUpdate(id, { name, email, picture })
    .then(() => {
      res.redirect(`/profile/${id}`);
    })
    .catch((error) => next(error));
});

// GET - '/profile/:id' - Loads user with params.id from collection, renders profile page.
profileRouter.get('/:id', (req, res, next) => {
  const { id } = req.params;
  let user;
  User.findById(id)
    .then((userData) => {
      if (!userData) return Promise.reject(new Error('PROFILE_NOT_FOUND'));

      user = userData;
      return Publication.find({ creator: id }).sort({ createdAt: -1 });
    })
    .then((publications) => {
      let isOwner = req.user && String(req.user._id) === id;
      res.render('profile/single', { profile: user, publications, isOwner });
    })
    .catch((error) => next(error));
});

module.exports = profileRouter;
