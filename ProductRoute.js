const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');
router.get('/product/entry',productController.getProductData)
router.post('/product/entry',productController.postProductData)
router.get ('/product/Update/:Id', productController.getProductUpdate)
router.post ('/product/Update', productController.postProductUpdate)
router.get('/product/view',productController.getProductView)
router.get('/product/Delete/:Id',productController.getProductDelete)
module.exports = router;