const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const EasyTworun = require('../Models/EasyTworun.models');

// Controller function to add a category question
exports.addamount = catchAsync(async (req, res, next) => {
    const { amount, status, paymentmode, upi ,email } = req.body;

   
    // Create a new instance of the AddCategory model
    const newCategory = await EasyTworun.create({
        amount,
        status,
        paymentmode,
        upi,
        email
    });

    // Send response
    res.status(201).json({
        status: 'success',
        data: {
            data: newCategory
        }
    });
});

exports.getdata = catchAsync(async (req, res, next) => {
    const { email } = req.query; // Assuming email ID is passed as a query parameter

    if (!email) {
        return next(new AppError('Email ID is required', 400));
    }

    // Query the database for entries matching the email ID and sort in descending order by 'createdAt'
    const categories = await EasyTworun.find({ email }).sort({ createdAt: -1 });

    if (categories.length === 0) {
        return next(new AppError('No data found for the provided email ID', 404));
    }

    // Send response
    res.status(200).json({
        status: 'success',
        data: {
            categories
        }
    });
});
