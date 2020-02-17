const express = require('express');

const PostRouter = require('./posts/post-router');

//const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.use('/api/accounts', PostRouter);

server.get('/', (req, res) => {
    res.send('<h3>DB Helpers with knex</h3>');
  });

module.exports = server;