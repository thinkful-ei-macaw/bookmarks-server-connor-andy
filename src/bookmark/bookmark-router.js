const express = require('express');
const uuid = require('uuid/v4');
const bookmarkRouter = express.Router();
const bodyParser = express.json();
const logger = require('../logger');


bookmarkRouter
  .route('/')
  .get((req, res) => {

    res.json(bookmarks);
  })
  .post(bodyParser, (req, res) => {
    // destructure
  });

bookmarkRouter
  .route('/:id')
  .get((req, res) => {

  })
  .delete((req, res) => {
    
  });



module.exports = bookmarkRouter;