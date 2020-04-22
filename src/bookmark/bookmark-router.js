const express = require('express');
const { v4: uuidv4 } = require('uuid');
const bookmarkRouter = express.Router();
const bodyParser = express.json();
const logger = require('../logger');

const { bookmarks } = require('../store');

bookmarkRouter
  .route('/')
  .get((req, res) => {
    res.json(bookmarks);
  })
  .post(bodyParser, (req, res) => {
    const { title, url, description, rating=0 } = req.body;

    if (!title) {
      logger.error('Title is required');
      return res
        .status(400)
        .send('Invalid data');
    }

    if (!url) {
      logger.error('url is required');
      return res
        .status(400)
        .send('Invalid data');
    }

    if (!description) {
      logger.error('Description is required');
      return res
        .status(400)
        .send('Invalid data');
    }

    // get an id
    const id = uuidv4();

    const bookmark = {
      id,
      title, 
      url, 
      description, 
      rating
    };

    bookmarks.push(bookmark);

    logger.info(`Bookmark with id ${id} created`);

    res
      .status(201)
      .location(`http://localhost:800/bookmark/${id}`)
      .json(bookmark);
  });

bookmarkRouter
  .route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    const bookmark = bookmarks.find(b => b.id === id);

    if(!bookmark) {
      logger.error(`Bookmark with id ${id} not found`);
      return res
        .status(404)
        .send('Bookmark Not Found');
    }

    res.json();
  })
  .delete((req, res) => {
    const { id } = req.params;
    const bookmarkIndex = bookmarks.findIndex(b => b.id === id);

    if (bookmarkIndex === -1) {
      logger.error(`Bookmark with id ${id} not found`);
      return res
        .status(404)
        .send('Not found');
    }

    bookmarks.splice(bookmarkIndex, 1);

    logger.info(`Bookmark with id ${id} deleted`);

    res
      .status(204)
      .end();
  });



module.exports = bookmarkRouter;