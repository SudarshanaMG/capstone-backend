const express = require('express');
const router = express.Router();
const inputsController = require('../controller/inputController');
const { authMiddleware, authRoles} = require('../middleware/authMiddleware');


router.get('/', authMiddleware, inputsController.getAllInputs);
router.post('/', authMiddleware, inputsController.createInput);
router.put('/:id', authMiddleware, inputsController.updateInput);
router.get('/getid/:id',authMiddleware, inputsController.getInputById);
router.get('/getByName', authMiddleware, inputsController.getInputByUserName);
router.patch('/:id/set-contractorid/:contractorId', authMiddleware, inputsController.setContractorId);
router.post('/:id/set-estimation-done', authMiddleware, inputsController.setEstimationDone);
router.post('/:id/assign-contractor', authMiddleware, inputsController.assignContractor);
router.get('/contractor/:contractorId', inputsController.getInputsByContractorId);

module.exports = router;
