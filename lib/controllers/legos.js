const { Router } = require('express');

const LegoSet = require('../models/LegoSet.js');

module.exports = Router()
  .post('/', async (req, res) => {
    const legos = await LegoSet.insert(req.body);

    res.json(legos);
  })

  .get('/', async (req, res) => {
    const legos = await LegoSet.getAll();

    res.json(legos);
  })

  .get('/:id', async (req, res) => {
    const { id } = req.params;
    const legos = await LegoSet.getById(id);

    res.json(legos);
  })

  .patch('/:id', async (req, res) => {
    const { id } = req.params;
    const legos = await LegoSet.update(id, req.body);

    res.json(legos);
  })

  .delete('/:id', async (req, res) => {
    const { id } = req.params;
    const legos = await LegoSet.delete(id);

    res.json(legos);
  });
