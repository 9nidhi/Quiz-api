const express = require('express');
const { addcatquetion ,deletecategory,getcategory,updatecategory} = require('../Controller/addCategory.controller');
const router = express.Router();

router.post('/addcategory', addcatquetion);
router.delete('/deletecategory/:id', deletecategory);
router.get('/', getcategory);
router.patch('/updatecategory/:id', updatecategory);

module.exports = router;
