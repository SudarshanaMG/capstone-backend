const express = require('express');
const router = express.Router();
const contractorController = require('../controller/contractorController');

router.get('/', contractorController.getAllContractors);
router.post('/addcontractor', contractorController.addContractor);
router.patch('/:id/availability', contractorController.updateAvailability);
// router.post('/:contractorId/assign', contractorController.assignContractorToProject);
router.get('/available', contractorController.getAvailableContractors);
router.get('/specialization', contractorController.findContractorIdBySpecialization);
router.get('/:id', contractorController.getContractorById);
router.get('/:id/with-inputs', contractorController.getContractorWithInputs);

module.exports = router;
