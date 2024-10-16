const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subcatquestionaddSchema = new Schema({
	Title: {
        type: String
    },
    icon: {
        type: String
    },
    subcategory: [String],
    category: {
        type: String, // Store only the category name
        required: true
    },
    categoryName:[ {
        type: String // This can be used if you want a separate field for storing the category name
    }],
    playuser:{
        type: String    
    }
}, {timestamps: true});

const AddSubCategory = mongoose.model('addSubcategory', subcatquestionaddSchema);

module.exports = AddSubCategory;
