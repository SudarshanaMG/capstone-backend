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
    const response = await axios.get(`http://localhost:3001/api/users/phoneNumber`, {
      headers: {
        Authorization: req.headers.authorization // forward the JWT if needed
      }
    });
    // console.log(response);
    const input = new Input({
        ...req.body,
        phoneNumber: response.data,
        userEmail : req.user.email,
        userName : req.user.name
    });

    const saved = await input.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateInput = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch latest phoneNumber using auth token
    const response = await axios.get(`http://localhost:3001/api/users/phoneNumber`, {
      headers: {
        Authorization: req.headers.authorization
      }
    });

    const updatedData = {
      ...req.body,
      phoneNumber: response.data,
      userEmail: req.user.email,
      userName: req.user.name
    };

    const updatedInput = await Input.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedInput) {
      return res.status(404).json({ message: 'Estimation input not found' });
    }

    res.status(200).json(updatedInput);
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
    const input = await Input.find({userEmail: req.user.email});
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

// exports.setEstimationDone = async (req, res) => {
//   try {
//     await Input.findByIdAndUpdate(req.params.id, {
//       done: true
//     });
//     res.sendStatus(200);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

exports.setEstimationDone = async (req, res) => {
  try {
    const { totalCost } = req.body;

    if (typeof totalCost === null) {
      return res.status(400).json({ message: 'totalCost must be a number' });
    }

    const updatedInput = await Input.findByIdAndUpdate(
      req.params.id,
      {
        done: true,
        totalCost: totalCost
      },
      { new: true } // Return the updated document
    );

    if (!updatedInput) {
      return res.status(404).json({ message: 'Input not found' });
    }

    res.status(200).json({ message: 'Estimation marked as done', input: updatedInput });
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


