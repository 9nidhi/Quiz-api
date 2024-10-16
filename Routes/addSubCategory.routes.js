const express = require('express');
const { addsubcategory,uploadImages,deletesubcategory,getsubcategory,getcatwisesubcategory,updatesubcategory} = require('../Controller/addSubCategory.controller');
const router = express.Router();

router.post('/addsubcategory', uploadImages,addsubcategory);
router.delete('/deletesubcategory/:id', deletesubcategory);
router.get('/getsubcategory', getsubcategory);
router.get('/getcatwisesubcategory/:category', getcatwisesubcategory);
router.patch('/updatesubcategory/:id',uploadImages, updatesubcategory);



module.exports = router;