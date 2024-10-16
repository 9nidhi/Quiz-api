const express = require('express');
const { addqusetioncategory,getqustioncategory,deletequstioncategory,getcatwisequestion,getcatsubwisequestion} = require('../Controller/addCatwisequetion.controller');
const router = express.Router();

router.post('/addqusetioncategory', addqusetioncategory);
router.get('/getqustioncategory', getqustioncategory);
router.delete('/deletequstioncategory/:id', deletequstioncategory);
router.get('/getcatwisequestion/:categoryName', getcatwisequestion);
router.get('/getcatsubwisequestion/:categoryName/:subcategoryName', getcatsubwisequestion);




module.exports = router;