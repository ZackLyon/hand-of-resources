const { Router } = require('express');

const Dessert = require('../models/Dessert.js');

module.exports = Router()
  .post('/', async (req, res) => {
    const dessert = await Dessert.insert(req.body);

    res.json(dessert);
  })

  .get('/', async (req, res) => {
    const dessert = await Dessert.getAll();

    res.json(dessert);
  })

  .get('/:id', async (req, res) => {
    const { id } = req.params;
    const dessert = await Dessert.getById(id);

    res.json(dessert);
  })

  .patch('/:id', async (req, res) => {
    const { id } = req.params;
    const dessert = await Dessert.update(id, req.body);

    res.json(dessert);
  })

  .delete('/:id', async (req, res) => {
    const { id } = req.params;
    const dessert = await Dessert.delete(id);

    res.json(dessert);
  });
