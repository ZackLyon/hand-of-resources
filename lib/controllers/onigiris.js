const { Router } = require('express');

const Onigiri = require('../models/Onigiri.js');

module.exports = Router()
  .post('/', async (req, res) => {
    const onigiri = await Onigiri.insert(req.body);

    res.json(onigiri);
  })

  .get('/', async (req, res) => {
    const onigiri = await Onigiri.getAll();

    res.json(onigiri);
  })

  .get('/:id', async (req, res) => {
    const { id } = req.params;
    const onigiri = await Onigiri.getById(id);

    res.json(onigiri);
  })

  .patch('/:id', async (req, res) => {
    const { id } = req.params;
    const onigiri = await Onigiri.update(id, req.body);

    res.json(onigiri);
  })

  .delete('/:id', async (req, res) => {
    const { id } = req.params;
    const onigiri = await Onigiri.delete(id);

    res.json(onigiri);
  });
