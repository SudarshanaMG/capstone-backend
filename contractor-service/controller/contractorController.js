const contractor = require('../model/contractorSchema');
// const Input = require('../models/Input');
const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Get all contractors
exports.getAllContractors = async (req, res) => {
  try {
    const contractors = await contractor.find();
    res.json(contractors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await contractor.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    if (password !== user.password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ id: user._id, email: user.email, name:user.name}, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.json({ token, role: user.role });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get contractor by ID
exports.getContractorById = async (req, res) => {
  try {
    const newContractor = await contractor.findById(req.params.id);
    if (!newContractor) return res.status(404).json({ message: 'contractor not found' });
    res.json(newContractor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add new contractor
exports.addContractor = async (req, res) => {
  try {
    const newContractor = new contractor(req.body);
    const saved = await newContractor.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update contractor availability
exports.updateAvailability = async (req, res) => {
  try {
    const updated = await contractor.findByIdAndUpdate(
      req.params.id,
      { available: req.query.available },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Assign contractor to project (input)
// exports.assignContractorToProject = async (req, res) => {
//   const { contractorId } = req.params;
//   const { inputId } = req.query;

//   try {
//     await Input.findByIdAndUpdate(inputId, { contractorId: contractorId }, { new: true });
//     const contractor = await contractor.findById(contractorId);
//     res.json(contractor);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// Get available contractors by specialization
exports.getAvailableContractors = async (req, res) => {
  const { specialization } = req.query;

  try {
    const contractors = await contractor.find({
      specialization,
      available: 'true'
    });
    res.json(contractors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get contractor with inputs
// exports.getContractorWithInputs = async (req, res) => {
//   try {
//     const contractor = await contractor.findById(req.params.id);
//     if (!contractor) return res.status(404).json({ message: 'contractor not found' });

//     const inputs = await Input.find({ constructionId: contractor._id });
//     res.json({ contractor, inputs });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

const INPUT_SERVICE_URL = process.env.INPUT_SERVICE_BASE_URL || 'http://localhost:3002/api/input';

exports.getContractorWithInputs = async (req, res) => {
  try {
    // Get contractor ID from JWT (authMiddleware should populate req.user)
    const contractorId = req.params.id;

    const newcontractor = await contractor.findById(contractorId);
    if (!newcontractor) {
      return res.status(404).json({ message: 'Contractor not found' });
    }

    // Call Input microservice to fetch inputs assigned to this contractor
    const response = await axios.get(`${INPUT_SERVICE_URL}/contractor/${contractorId}`, {
      // headers: {
      //   Authorization: req.headers.authorization, // Forward token
      // },
    });

    const inputs = response.data;

    res.json({ newcontractor, inputs });
  } catch (err) {
    console.error('Error fetching contractor with inputs:', err.message);
    res.status(500).json({ message: 'Failed to fetch contractor inputs' });
  }
};

exports.findContractorIdBySpecialization = async (req, res) => {
    try {
        const newcontractor = await contractor.findOne({ specialization: req.query.specialization, available: 'true' });
        if (!newcontractor) return res.status(404).json({ message: 'No contractor found' });
    
        res.json({ contractorId: newcontractor._id });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
  };

  exports.updateContractor = async (req, res) => {
    try {
      const updatedContractor = await contractor.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!updatedContractor) {
        return res.status(404).json({ message: 'Contractor not found' });
      }
      res.status(200).json(updatedContractor);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  // Delete contractor
  exports.deleteContractor = async (req, res) => {
    try {
      const deleted = await Contractor.findByIdAndDelete(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: 'Contractor not found' });
      }
      res.status(200).json({ message: 'Contractor deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };