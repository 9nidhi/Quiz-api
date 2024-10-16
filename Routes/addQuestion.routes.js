const express = require('express');
const { addquetion, getquestion,deletequetion } = require('../Controller/addQuestion.controller');
const router = express.Router();

router.post('/addquetion', addquetion);
router.get('/getquetion', getquestion);
router.delete('/deletequetion/:id', deletequetion);

module.exports = router;
