const _ = require('lodash');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const AddCategory = require('../Models/addCategory.models');


exports.addcatquetion = catchAsync(async (req, res, next) => {
    const { category } = req.body;

    // Validate input
    if (!category) {
        return next(new AppError('Please provide a category name.', 400));
    }

    // Check if the category already exists
    const existingCategory = await AddCategory.findOne({ category });

    if (existingCategory) {
        return next(new AppError('This category already exists.', 400));
    }

    // Create and save the new category
    const newCategory = await AddCategory.create({
        category
    });

    res.status(201).json({
        status: 'success',
        data: {
            category: newCategory
        }
    });

});


exports.deletecategory = catchAsync(async (req, res, next) => {
    const { id } = req.params; // Assuming you want to delete by category ID

    if (!id) {
        return next(new AppError('Please provide a category ID.', 400));
    }

    // Find and delete the category
    const category = await AddCategory.findByIdAndDelete(id);

    if (!category) {
        return next(new AppError('No category found with that ID.', 404));
    }

    res.status(201).json({
        status: 'success',
        data: {
            category: category
        },
        message: "Delete data Done."
    });

});

exports.getcategory = catchAsync(async (req, res, next) => {
    const question = await AddCategory.find();

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

exports.updatecategory = catchAsync(async (req, res, next) => {
    // Extract the category ID and updated data from the request
    const { id } = req.params;
    console.log("id", id)
    const category = req.body;

    // Find and update the category
    const updatedCategory = await AddCategory.findByIdAndUpdate(id, category, {
        new: true, // Return the updated document
        runValidators: true // Validate the data against the model schema
    });

    if (!updatedCategory) {
        return res.status(404).json({
            status: 'fail',
            message: 'Category not found'
        });
    }

    // Send the response
    res.status(200).json({
        status: 'success',
        data: {
            category: updatedCategory
        }
    });
});