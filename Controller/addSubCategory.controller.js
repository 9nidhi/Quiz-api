const _ = require('lodash');
const catchAsync = require('../utils/catchAsync');
const multer = require('multer');
const AppError = require('../utils/appError');
const path = require('path');
const Category = require("../Models/addCategory.models");
const AddSubCategory = require('../Models/addSubCategory.models')


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



// Middleware to handle multiple file uploads
exports.uploadImages = upload.single('icon');


exports.addsubcategory = catchAsync(async (req, res, next) => {
    const { id } = req.query; // Extract category ID from the query parameters
    const { subcategory,Title } = req.body; // Extract subcategory from the request body

    // Validate input
    if (!subcategory) {
        return next(new AppError('Please provide a subcategory name.', 400));
    }

    // Check if the category ID is valid and exists
    const category = await Category.findById(id);
    
    if (!category) {
        return next(new AppError('Category not found.', 404));
    }

    // Check if the subcategory already exists within the same category
    const existingSubcategory = await AddSubCategory.findOne({ subcategory, category: category.category });

    if (existingSubcategory) {
        return next(new AppError('This subcategory already exists within the selected category.', 400));
    }

    const icon = req.file.originalname;
   
    const newSubcategory = await AddSubCategory.create({ 
        subcategory, 
        Title,
        icon,
        category: category.category, 
    });

    res.status(201).json({
        status: 'success',
        data: {
            subcategory: newSubcategory
        }
    });
});


exports.deletesubcategory = catchAsync(async (req, res, next) => {
    const { id } = req.params; // Assuming you want to delete by category ID

    if (!id) {
        return next(new AppError('Please provide a category ID.', 400));
    }

    // Find and delete the category
    const category = await AddSubCategory.findByIdAndDelete(id);

    if (!category) {
        return next(new AppError('No category found with that ID.', 404));
    }

    res.status(201).json({
        status: 'success',
        data: {
            category: category
        },
        message:"Delete data Done."
    });

});

exports.getsubcategory = catchAsync(async (req, res, next) => {
    const question = await AddSubCategory.find();

    if (!question.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'No questin found'
        });
    }

    return res.status(200).json({
        status: 'success',
        data: {
            question
        }
    });
});


exports.getcatwisesubcategory = catchAsync(async (req, res, next) => {
    const { category } = req.params; // Extract the category name or ID from the URL parameters

    // Validate input
    if (!category) {
        return next(new AppError('Please provide a category.', 400));
    }

    // Fetch all subcategories that belong to the provided category
    const subcategories = await AddSubCategory.find({ category });

    if (subcategories.length === 0) {
        return next(new AppError('No subcategories found for this category.', 404));
    }

    // Send the response with the subcategories
    res.status(200).json({
        status: 'success',
        data: {
            subcategories
        }
    });
});


exports.updatesubcategory = catchAsync(async (req, res, next) => {
    const iconPath = req.file ? req.file.path : null;
    const { id } = req.params;
    const { Title, subcategory, category, playuser } = req.body;

    console.log('id =>', id);
    console.log('req.body =>', req.body);
    console.log('req.file =>', req.file);

    // Find the subcategory by ID
    const subcategoryToUpdate = await AddSubCategory.findById(id);

    if (!subcategoryToUpdate) {
        return next(new AppError('Subcategory not found', 404));
    }

    // Update only if new data is provided
    if (Title) subcategoryToUpdate.Title = Title;
    if (subcategory) subcategoryToUpdate.subcategory = subcategory.split(',');
    if (category) subcategoryToUpdate.category = category;
    if (playuser) subcategoryToUpdate.playuser = playuser;
    if (iconPath) subcategoryToUpdate.icon = iconPath;

    // Save the updated subcategory
    await subcategoryToUpdate.save();

    res.status(200).json({
        status: 'success',
        data: {
            subcategory: subcategoryToUpdate
        }
    });
});