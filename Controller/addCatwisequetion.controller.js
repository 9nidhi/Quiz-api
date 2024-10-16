const _ = require('lodash');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const AddcatwiseQuetion = require('../Models/addCatwisequetion.models');
const Category = require("../Models/addCategory.models");
const Subcategory = require("../Models/addSubCategory.models");
const multer = require('multer');
const path = require('path');

// Set up multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Set the uploads directory
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Name the file with a timestamp
    },
});

const upload = multer({ storage: storage });

// Middleware to handle single file upload
exports.uploadImage = upload.single('icon');

exports.addqusetioncategory  = catchAsync(async (req, res, next) => {
    const { question, answer, correctOptionIndex } = req.body;
    const { categoryName, subcategoryName } = req.query;

    // Validate that all required fields are present
    if (!question || !answer || correctOptionIndex === undefined) {
        return next(new AppError('Please provide all required fields: question, answer, and correctOptionIndex.', 400));
    }

    // Ensure the answer is an array
    if (!Array.isArray(answer)) {
        return next(new AppError('Answer must be an array.', 400));
    }

    // Validate correctOptionIndex
    // Adjust range to 1 to 4
    if (correctOptionIndex < 1 || correctOptionIndex > answer.length) {
        return next(new AppError('Invalid correctOptionIndex. It must be a valid index within the answer array, between 1 and 4.', 400));
    }

    // Convert `correctOptionIndex` from 1-based to 0-based for internal processing
    const correctIndex = correctOptionIndex ;

    // Find the category by name
    const category = await Category.findOne({ category: categoryName });
    if (!category) {
        return res.status(404).json({
            status: 'fail',
            message: 'Category not found',
        });
    }

    // Find the subcategory by name
    const subcategory = await Subcategory.findOne({ subcategory: subcategoryName });
    if (!subcategory) {
        return res.status(404).json({
            status: 'fail',
            message: 'Subcategory not found',
        });
    }

    // Check if the question already exists in the specified category and subcategory
    const existingQuestion = await AddcatwiseQuetion.findOne({
        question: question, // Standardize the question for comparison
        categoryName: categoryName,
        subcategoryName: subcategoryName
    });

    console.log('existingQuestion =>',existingQuestion);
    
    if (existingQuestion) {
        return res.status(400).json({
            status: 'fail',
            message: 'This question already exists in the specified category and subcategory.',
        });
    }

    // Create and save the new question category
    const newQuestionCategory = await AddcatwiseQuetion.create({
        question,
        answer,
        correctOptionIndex: correctIndex, // Save as 0-based index
        category: category._id, // Store ObjectId
        subcategory: subcategory._id, // Store ObjectId
        categoryName: category.category, // Store category name
        subcategoryName: subcategory.subcategory // Store subcategory name
    });

    // Respond with success and the created question category
    res.status(201).json({
        status: 'success',
        data: {
            questionCategory: newQuestionCategory,
        },
    });
});



exports.getqustioncategory = catchAsync(async (req, res, next) => {
    const quetion = await AddcatwiseQuetion.find();

    if (!quetion.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'No questin found'
        });
    }

    return res.status(200).json({
        status: 'success',
        data: {
            quetion
        }
    });
});

exports.deletequstioncategory = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    // Validate ID
    if (!id) {
        return next(new AppError('No ID provided. Please provide a valid question ID.', 400));
    }

    // Check if question exists
    const question = await AddcatwiseQuetion.findById(id);
    if (!question) {
        return next(new AppError('No question found with that ID.', 404));
    }

    // Delete the question
    await AddcatwiseQuetion.findByIdAndDelete(id);

    
    return res.status(200).json({
        status: 'success',
        message: 'Question deleted successfully.'
    });
});


exports.getcatwisequestion = catchAsync(async (req, res, next) => {
    const { categoryName } = req.params; // Extract the category name from the URL parameters
    console.log('categoryName =>', categoryName);

    // Validate input
    if (!categoryName) {
        return next(new AppError('Please provide a category name.', 400));
    }

    // Fetch all questions that belong to the provided category
    const questions = await AddcatwiseQuetion.find({ categoryName });

    console.log('Found questions =>', questions);

    if (questions.length === 0) {
        return next(new AppError('No questions found for this category.', 404));
    }

    // Send the response with the questions
    res.status(200).json({
        status: 'success',
        data: {
            questions
        }
    });
});



exports.getcatsubwisequestion = catchAsync(async (req, res, next) => {
    const { categoryName, subcategoryName} = req.params; // Extract the category name from the URL parameters
    console.log('categoryName =>', categoryName);

    // Validate input
    if (!categoryName) {
        return next(new AppError('Please provide a category name.', 400));
    }

    // Fetch all questions that belong to the provided category
    const questions = await AddcatwiseQuetion.find({ categoryName,subcategoryName });

    console.log('Found questions =>', questions);

    if (questions.length === 0) {
        return next(new AppError('No questions found for this category.', 404));
    }

    // Send the response with the questions
    res.status(200).json({
        status: 'success',
        data: {
            questions
        }
    });
});