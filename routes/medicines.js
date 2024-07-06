
const express = require('express');
const Medicine = require('../models/Medicine');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, async (req, res) => {
  try {
    const medicine = new Medicine({
      ...req.body,
      pharmacy: req.body.pharmacyId
    });
    await medicine.save();
    res.status(201).send(medicine);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/', async (req, res) => {
  try {
    const medicines = await Medicine.find();
    res.send(medicines);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const medicine = await Medicine.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!medicine) {
      return res.status(404).send();
    }
    res.send(medicine);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const medicine = await Medicine.findByIdAndDelete(req.params.id);
    if (!medicine) {
      return res.status(404).send();
    }
    res.send(medicine);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;