const _ = require('lodash');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const AddQuestion = require('../Models/addQuestion.models');


exports.addquetion = catchAsync(async (req, res, next) => {
    console.log('Incoming request data:', req.body);
const { question, answer, correctOptionIndex } = req.body;

// Parse correctOptionIndex as a number
const correctOptionIndexNumber = Number(correctOptionIndex);

if (!question || !Array.isArray(answer) || answer.length !== 4 || isNaN(correctOptionIndexNumber)) {
    return next(new AppError('Invalid input. Please provide a question, four answers, and the correct answer index.', 400));
}

// Adjusted to match 1-based index
if (correctOptionIndexNumber < 1 || correctOptionIndexNumber > 4) {
    return next(new AppError('Correct answer index must be between 1 and 4.', 400));
}

// Check if the question already exists
const existingQuestion = await AddQuestion.findOne({ question });

if (existingQuestion) {
    return next(new AppError('This question already exists.', 400));
}

// Convert correctOptionIndex to 0-based before storing
const newQuestion = await AddQuestion.create({
    question,
    answer,
    correctOptionIndex: correctOptionIndexNumber - 1 // Adjust to 0-based index for storage
});

res.status(201).json({
    status: 'success',
    data: {
        question: newQuestion
    }
});

});


exports.getquestion = catchAsync(async (req, res, next) => {
    const questions = await AddQuestion.find();

    // Check if there are any questions
    if (!questions.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'No questions found'
        });
    }

    // Shuffle the array of questions
    const shuffledQuestions = questions.sort(() => 0.5 - Math.random());

    // Return all shuffled questions
    return res.status(200).json({
        status: 'success',
        data: {
            questions: shuffledQuestions
        }
    });
});



exports.deletequetion = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    // Validate ID
    if (!id) {
        return next(new AppError('No ID provided. Please provide a valid question ID.', 400));
    }

    // Check if question exists
    const question = await AddQuestion.findById(id);
    if (!question) {
        return next(new AppError('No question found with that ID.', 404));
    }

    // Delete the question
    await AddQuestion.findByIdAndDelete(id);

    
    return res.status(200).json({
        status: 'success',
        message: 'Question deleted successfully.'
    });
});

