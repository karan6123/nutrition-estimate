
const express = require('express');
const router = express.Router();
const { estimateNutrition } = require('../controllers/nutritionController');

router.post('/', estimateNutrition);

module.exports = router;
