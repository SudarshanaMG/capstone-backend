const axios = require('axios');
const MaterialEstimator = require('../model/modelSchema');
const MATERIAL_UNIT_PRICES = require('../utils/unitPrice');
const costDistribution = require('../utils/costDistribution');
const categorizedMaterials = require('../utils/categoryToMaterials');
const projectMaterialMap = require('../utils/projectMaterialMap');
const MaterialEstimateResult = require('../model/materialEstimateResults');

function getMaterialsForProject(constructionType) {
  const map = projectMaterialMap[constructionType];

  if (!map) {
    throw new Error(`Unknown construction type: ${constructionType}`);
  }
  
  if (map?.useAllFromCategory) {
    return Object.values(categorizedMaterials).flat(); // use all materials
  }

  const selectedMaterials = [];
  for (const [category, materials] of Object.entries(map)) {
    selectedMaterials.push(...materials);
  }
  // console.log(selectedMaterials);
  return selectedMaterials;
}


const adjustCostForQuality = (cost, quality) => {
  switch (quality.toLowerCase()) {
    case 'premium':
      return cost * 1.2;
    case 'luxury':
      return cost * 1.5;
    case 'basic':
    default:
      return cost;
  }
};

const createMaterial = ( inputId, resourceName, cost, quality) => {
  const adjustedCost = adjustCostForQuality(cost, quality).toFixed(0);
  const unitPrice = MATERIAL_UNIT_PRICES[resourceName] || 0;
  const isLumpSum = [
    'MiscellaneousFittings',
    'MiscAccessories',
    'OtherAccessoriesSealants',
    'PaintBrushes_Rollers_Masking',
    'LegalApproval',
    'InstallationLabor',
    'InstallationCharges',
    'Laborforcarpentry',
    'ScaffoldingLabor'
  ].includes(resourceName);

  const resourceQuantity = (!unitPrice || isLumpSum)
  ? null
  : (adjustedCost / unitPrice).toFixed(0);


  return new MaterialEstimator({
    // materialId,
    inputId,
    resourceName,
    resourceQuantity,
    quality,
    cost: adjustedCost
  });
};

const fetchTotalCostFromCostEstimator = async (req, inputId) => {
  try {
    // console.log(req.header('Authorization'));
    // console.log(inputId);
    const response = await axios.post(`http://service4:3004/api/estimation/calculate/${inputId}`,{},{
    headers: {
      Authorization: req.header('Authorization'), // Forward token
    },
  });
  // console.log(response);
  if(response == null){
    console.error('Error response', error.message);
  }
  const { totalCost } = response.data;
  if (totalCost == null) throw new Error('Failed to fetch total cost');
  return totalCost;
}catch (error) {
    console.error('Error fetching total cost:', error.message);
    throw error;
  }
};

const fetchConstructionType = async (req, inputId) => {
  try {
    // console.log(req.header('Authorization'));
    // console.log(inputId);
    const response = await axios.get(`http://service2:3002/api/input/getid/${inputId}`,{
            headers: {
                  Authorization: req.header('Authorization'), // Forward token
                },
        });
  // console.log(response);
  if(response == null){
    console.error('Error response', error.message);
  }
  // console.log(response.data);
  const constructionType  = response.data.constructionType;
  if (constructionType == null) throw new Error('Failed to fetch constructionType');
  return constructionType;
}catch (error) {
    console.error('Error fetching constructionType:', error);
    throw error;
  }
};

exports.calculateMaterialCost = async (req, inputId, quality) => {
  const totalCost = await fetchTotalCostFromCostEstimator(req, inputId);
  // console.log(totalCost);
  const constructionType = await fetchConstructionType(req, inputId);
  // console.log(constructionType);
  const responseDone = await axios.post(`http://service2:3002/api/input/${inputId}/set-estimation-done`,{
    totalCost: totalCost // Send the total cost
  },{
    headers: {
      Authorization: req.header('Authorization'), // Forward token
    },
  });
  // console.log(responseDone);
  const selectedMaterials = getMaterialsForProject(constructionType);

  const materials = Object.entries(costDistribution[constructionType])
    .filter(([name]) => selectedMaterials.includes(name))
    .map(([name, pct]) =>
      createMaterial( inputId, name, totalCost * pct, quality)
    );

  await MaterialEstimator.insertMany(materials);

  const saveData = {
    inputId,
    totalCost,
    quality,
    projectType : constructionType,
    materials: materials.map(m => ({
      resourceName: m.resourceName,
      cost: m.cost,
      resourceQuantity: m.resourceQuantity,
      unitPrice: MATERIAL_UNIT_PRICES[m.resourceName] || 0
    }))
  };
  // console.log(saveData);

  await MaterialEstimateResult.findOneAndUpdate(
    { inputId },
    saveData,
    { upsert: true, new: true }
  );
  return {materials, totalCost};
};

exports.getEstimateByInputId = async (inputId) => {
  const result = await MaterialEstimateResult.findOne({ inputId });
  if (!result) {
    throw new Error('Estimate not found');
  }
  return result;
};
