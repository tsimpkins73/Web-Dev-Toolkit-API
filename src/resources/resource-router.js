require('dotenv').config()
const express = require('express');
const resource_router = express();
const jsonParser = express.json();
const ResourcesService = require('./resource-service');
const jsonBodyParser = express.json();
const cors = require('cors');

resource_router.get('/api/resources', (req, res) => {
  const knexInstance = req.app.get('db') 
  ResourcesService.getAllResources(knexInstance)
    .then(results => {
      res.send(results);
    });
});

resource_router.get('/api/categories', (req, res) => {
  const knexInstance = req.app.get('db') 
  ResourcesService.getAllCategories(knexInstance)
    .then(results => {
      res.send(results);
    });
});

resource_router.get('/api/Resources/:id', jsonParser, (req, res) => {
  const {
    id
  } = req.params;
  const knexInstance = req.app.get('db')
 
  ResourcesService.getById(knexInstance, id)
    .then(results => {
      res.send(results);
    });
    
});

resource_router.get('/api/comments/:id', jsonParser, (req, res) => {
  const {
    id
  } = req.params;
  const knexInstance = req.app.get('db')
 
  ResourcesService.getresourceComments(knexInstance, id)
    .then(results => {
      res.send(results);
    });
    
});

resource_router.delete('/api/comments/:id', jsonParser, (req, res) => {
  const {
    id
  } = req.params;
  const knexInstance = req.app.get('db')
 
  ResourcesService.deleteComment(knexInstance, id)
    .then(results => {
      res.sendStatus(200);
    });
    
});

resource_router.get('/api/Resources/category/:categoryId', jsonParser, (req, res) => {
  const {
    categoryId
  } = req.params;
  const knexInstance = req.app.get('db') 
  
  ResourcesService.getResourcesByCategoryId(knexInstance, categoryId)
    .then(results => {
      res.send(results);
    });
});


resource_router.post('/api/Resources', jsonBodyParser, (req, res, next) => {
  const {
    headline,
    url,
    summary,
    text,
    image,
    favorite,
  user_id } = req.body;
const newresource = {
  headline,
  url,
  summary,
  text,
  image,
  favorite };

const knexInstance = req.app.get('db')
for (const [key, value] of Object.entries(newresource))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        })



newresource.user_id = {user_id}

ResourcesService.insertresource(knexInstance, newresource)
      .then(resource => {
        res
          .status(201)
          .json(ResourcesService.serializeresource(resource))
      })
      .catch(next)
});


resource_router.delete('/Resources/:id', (req, res) => {
  const {
    id
  } = req.params;
  const knexInstance = req.app.get('db')

  ResourcesService.deleteresource(knexInstance, id)
  .then(results => {
    res.send(results);
  });
});

module.exports = resource_router