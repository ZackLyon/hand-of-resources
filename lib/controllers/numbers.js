const { Router } = require('express');

const RandomNumber = require('../models/RandomNumber.js');

module.exports = Router()
  .post('/', async (req, res) => {
    const colors = await RandomNumber.insert(req.body);

    res.json(colors);
  })

  .get('/', async (req, res) => {
    const colors = await RandomNumber.getAll();

    res.json(colors);
  })

  .get('/:id', async (req, res) => {
    const { id } = req.params;
    const colors = await RandomNumber.getById(id);

    res.json(colors);
  })

  .patch('/:id', async (req, res) => {
    const { id } = req.params;
    const colors = await RandomNumber.update(id, req.body);

    res.json(colors);
  })

  .delete('/:id', async (req, res) => {
    const { id } = req.params;
    const colors = await RandomNumber.delete(id);

    res.json(colors);
  });
