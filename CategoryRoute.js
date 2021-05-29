const express = require('express');
const router = express.Router();
const categoryController = require('../controller/categoryController');
router.get('/category/entry',categoryController.getCategoryData)
router.post('/category/entry',categoryController.postCategoryData)
router.get ('/category/Update/:Id', categoryController.getCategoryUpdate)
router.post ('/category/Update', categoryController.postCategoryUpdate)
router.get('/category/view',categoryController.getCategoryView)
router.get('/category/Delete/:Id',categoryController.getCategoryDelete)
module.exports = router;