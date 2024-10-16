const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const catwisequestionaddSchema = new Schema({
    // Title: {
    //     type: String
    // },
    // icon: {
    //     type: String
    // },
    question: {
        type: String
    },
    answer: [String],
    correctOptionIndex:
    {
        type: Number,
        required: true
    },
    categoryName: {
        type: String // Make sure this field is correctly named
    },
    subcategoryName: [String]

}, { timestamps: true });

const AddcatwiseQuetion = mongoose.model('addwisecatquestion', catwisequestionaddSchema);

module.exports = AddcatwiseQuetion;
