const axios = require('axios');
require('dotenv').config();
const CostEstimate = require('../model/estimateSchema'); // Mongoose model
const API_GATEWAY_URL = process.env.API_GATEWAY_URL || 'http://localhost:3000';


async function calculateCost(req) {
  try {
    const inputDTO = await fetchInputDetails(req);

    if (!inputDTO) {
      throw new Error('Failed to fetch input details from Inputs Service');
    }

    // Determine cost per square foot
    const constructionType = inputDTO.constructionType;
    let costPerSqFt;

    switch (constructionType) {
      case 'InteriorDesign':
        costPerSqFt = 1200;
        break;
      case 'NewConstruction':
        costPerSqFt = 1500;
        break;
      case 'Renovation':
        costPerSqFt = 1000;
        break;
      default:
        throw new Error('Invalid construction type: ' + constructionType);
    }

    // Calculate total cost
    const totalCost = inputDTO.length * inputDTO.width * inputDTO.totalFloor * costPerSqFt;

    const estimate = new CostEstimate({
      inputId: inputDTO._id,
      builtupArea: inputDTO.length * inputDTO.width,
      totalCost: totalCost
    });

    return await estimate.save();
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getAllEstimates() {
  return await CostEstimate.find();
}

async function getCostEstimate(inputId) {
  return await CostEstimate.findOne({ inputId });
}

async function fetchInputDetails(req) {
  try {
    // console.log(req.header('Authorization'));
    // console.log(req.params.inputId);
    const response = await axios.get(`http://service2:3002/api/input/getid/${req.params.inputId}`,{
        headers: {
              Authorization: req.header('Authorization'), // Forward token
            },
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching input details:', error.message);
    return null;
  }
}

module.exports = {
  calculateCost,
  getAllEstimates,
  getCostEstimate
};
