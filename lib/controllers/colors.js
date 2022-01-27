const { Router } = require('express');

const ColorPalette = require('../models/Color.js');

module.exports = Router()
  .post('/', async (req, res) => {
    const colors = await ColorPalette.insert(req.body);

    res.json(colors);
  })

  .get('/', async (req, res) => {
    const colors = await ColorPalette.getAll();

    res.json(colors);
  })

  .get('/:id', async (req, res) => {
    const { id } = req.params;
    const colors = await ColorPalette.getById(id);

    res.json(colors);
  })

  .patch('/:id', async (req, res) => {
    const { id } = req.params;
    const colors = await ColorPalette.update(id, req.body);

    res.json(colors);
  })

  .delete('/:id', async (req, res) => {
    const { id } = req.params;
    const colors = await ColorPalette.delete(id);

    res.json(colors);
  });
