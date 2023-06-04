const express = require('express');
const router = express.Router();
const productModule = require('../module/product');



router.get('/retention', productModule.getRetention);
router.get('/revenue',productModule.getRevenue);
router.post('/', productModule.setData);

module.exports = router;
