const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const catquestionaddSchema = new Schema({
	category: {
		type: String,
        unique: true
	},
    
}, {timestamps: true});

const AddCategory = mongoose.model('addcatquestion', catquestionaddSchema);

module.exports = AddCategory;
