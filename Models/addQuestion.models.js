const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionaddSchema = new Schema({
   
	question: {
		type: String,
	},
    answer:[{
        type: String,   
    }],
    correctOptionIndex: { type: Number, required: true },
    
	
}, {timestamps: true});

const AddQuestion = mongoose.model('addquestion', questionaddSchema);

module.exports = AddQuestion;
