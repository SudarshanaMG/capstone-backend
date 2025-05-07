require('dotenv').config();
const Input = require('../models/input'); // Mongoose model
const express = require('express');
const router = express.Router();
const axios = require('axios');


exports.getAllInputs = async (req, res) => {
  try {
    const inputs = await Input.find({userEmail: req.user.email});
    res.json(inputs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createInput = async (req, res) => {
  try {
    const input = new Input({
        ...req.body,
        userEmail : req.user.email,
        userName : req.user.name
    });

    const saved = await input.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getInputById = async (req, res) => {
  try {
    const input = await Input.findById(req.params.id);
    if (!input) return res.status(404).json({ message: 'Input not found' });
    res.json(input);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getInputByUserName = async (req, res) => {
  try {
    const input = await Input.find({userName: req.user.name});
    if (!input) return res.status(404).json({ message: 'Input not found' });
    res.json(input);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.setContractorId = async (req, res) => {
  try {
    await Input.findByIdAndUpdate(req.params.id, {
      contractorId: req.params.contractorId
    });
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const CONTRACTOR_SERVICE_URL = process.env.CONTRACTOR_SERVICE_URL || 'http://localhost:3003/api/contractor';

exports.assignContractor = async (req, res) => {
  try {
    const { specialization } = req.query;
    const response = await axios.get(`${CONTRACTOR_SERVICE_URL}/available?specialization=${specialization}`, {
      // headers: {
      //   Authorization: req.headers.authorization // forward the JWT if needed
      // }
    });
    const contractorId = response.data[0]?._id;
    if (!contractorId) {
      return res.status(404).json({ message: 'No contractor found for the given specialization' });
      // return res.status(404).json( response.data );
    }
    const updated = await Input.findByIdAndUpdate(
      req.params.id,
      { contractorId: contractorId },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Input not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getInputsByContractorId = async (req, res) => {
  try {
    const inputs = await Input.find({ contractorId: req.params.contractorId });
    res.json(inputs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


