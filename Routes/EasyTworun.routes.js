const express = require('express');
const { addamount,getdata} = require('../Controller/EasyTworun.controller');
const router = express.Router();

router.post('/addamount',addamount);
router.get('/getdata',getdata);



module.exports = router;