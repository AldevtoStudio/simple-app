'use strict';

const express = require('express');
const Publication = require('./../models/publication');
const meowRouter = new express.Router();
const routeGuard = require('../middleware/route-guard');

// GET - '/meow/create' - Renders meow creation page.
meowRouter.get('/create', routeGuard, (req, res) => {
  res.render('meow/create');
});

// POST - '/meow/create' - Handles new meow creation.
meowRouter.post('/create', routeGuard, (req, res, next) => {
  const { message } = req.body;
  // Call create method on Publication model.
  Publication.create({
    message,
    creator: req.user._id
  })
    .then(() => {
      res.redirect('/');
    })
    .catch((error) => next(error));
});

// GET - '/meow/:id' - Renders single meow page.
// GET - '/meow/:id/edit' - Renders meow edit page.
// POST - '/meow/:id/edit' - Handles edit form submission.
// POST - '/meow/:id/delete' - Handles deletion.

module.exports = meowRouter;
