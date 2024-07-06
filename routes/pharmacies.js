
const express = require('express');
const Pharmacy = require('../models/Pharmacy');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, async (req, res) => {
  try {
    const pharmacy = new Pharmacy({
      ...req.body,
      owner: req.user._id
    });
    await pharmacy.save();
    res.status(201).send(pharmacy);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/', async (req, res) => {
  try {
    const pharmacies = await Pharmacy.find();
    res.send(pharmacies);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/search', async (req, res) => {
  try {
    const pharmacies = await Pharmacy.find({ name: new RegExp(req.query.name, 'i') });
    res.send(pharmacies);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;

