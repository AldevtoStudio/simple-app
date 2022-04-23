'use strict';

const express = require('express');
const Publication = require('./../models/publication');
const routeGuard = require('./../middleware/route-guard');
const fileUpload = require('./../middleware/file-upload');
const meowRouter = new express.Router();

// GET - '/meow/create' - Renders meow creation page.
meowRouter.get('/create', routeGuard, (req, res) => {
  res.render('meow/create');
});

// POST - '/meow/create' - Handles new meow creation.
meowRouter.post('/create', routeGuard, fileUpload.single('picture'), (req, res, next) => {
  const { message } = req.body;
  let picture;
  if (req.file) picture = req.file.path;

  Publication.create({
    message,
    creator: req.user._id,
    picture
  })
    .then(() => {
      res.redirect('/');
    })
    .catch((error) => next(error));
});

// GET - '/meow/:id' - Renders single meow page.
meowRouter.get('/:id', (req, res, next) => {
  const { id } = req.params;
  Publication.findById(id)
    .populate('creator')
    .then((publication) => {
      res.render('meow/single', { publication });
    })
    .catch((error) => next(error));
});

// GET - '/meow/:id/edit' - Renders meow edit page.
meowRouter.get('/:id/edit', routeGuard, (req, res, next) => {
  const { id } = req.params;
  Publication.findById(id)
    .then((publication) => {
      res.render('meow/edit', { publication });
    })
    .catch((error) => next(error));
});

// POST - '/meow/:id/edit' - Handles edit form submission.
meowRouter.post('/:id/edit', routeGuard, fileUpload.single('picture'), (req, res, next) => {
  const { id } = req.params;
  const { message } = req.body;
  let picture;
  if (req.file) picture = req.file.path;
  Publication.findByIdAndUpdate(id, { message, picture })
    .then(() => {
      res.redirect(`/meow/${id}`);
    })
    .catch((error) => next(error));
});

// POST - '/meow/:id/delete' - Handles deletion.
meowRouter.post('/:id/delete', (req, res, next) => {
  const { id } = req.params;
  Publication.findByIdAndRemove(id)
    .then(() => {
      res.redirect('/');
    })
    .catch((error) => next(error));
});

module.exports = meowRouter;
