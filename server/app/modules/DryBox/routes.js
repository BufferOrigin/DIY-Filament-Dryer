const express = require('express');
const router = express.Router();
const dryboxController = require('./controller.js');

router.get('/status', dryboxController.getStatus);
router.post('/off', dryboxController.turnOff);
router.post('/set', dryboxController.setVariables);

module.exports = router;