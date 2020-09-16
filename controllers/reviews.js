const Review = require('../models/Review');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Bootcamp = require('../models/Bootcamp');

// API's

//@desc    Get Reviews
//@route   GET/api/v1/reviews
//@route   GET/api/v1/bootcamps/:bootcampId/reviews
//@access  public

exports.getReviews = asyncHandler(async (req, res, next) => {
    if (req.params.bootcampId) {
        const reviews = await Review.find({ bootcamp: req.params.bootcampId });
        return res.status(200).json({
            success: true,
            count: reviews.length,
            data: reviews
        })
    } else {
        res.status(200).json(res.advancedResults);
    }
});

//@desc    Get single Review
//@route   GET/api/v1/reviews/:id
//@access  public

exports.getReview = asyncHandler(async (req, res, next) => {
    const review = await Review.findById(req.params.id).populate({
        path: 'Bootcamp',
        select: 'name description'
    });
    if (!review) {
        return next(new ErrorResponse(`No review found with the id of ${req.params.id}`, 404));
    }
    res.status(200).json({
        success: true,
        data: review
    })
});

//@desc    Add Review
//@route   POST/api/v1/bootcamps/:bootcampId/reviews
//@access  Private

exports.addReview = asyncHandler(async (req, res, next) => {
    req.body.bootcamp = req.params.bootcampId;
    req.body.user = req.user.id;
    const bootcmp = await Bootcamp.findById(req.params.bootcampId);

    if (!bootcmp) {
        return next(new ErrorResponse(`No bootcamp with id ${req.params.bootcampId}`, 404))
    }
    const review = await Review.create(req.body);
    res.status(201).json({
        success: true,
        data: review
    })
});

//@desc    Update Review
//@route   PUT/api/v1/reviews/:id
//@access  Private

exports.updateReview = asyncHandler(async (req, res, next) => {

    let review = await Review.findById(req.params.id);

    if (!review) {
        return next(new ErrorResponse(`No review with id ${req.params.id}`, 404));
    }

    // Make sure review belongs to user or user is admin
    if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorResponse(`Not authorized to update review`, 401));
    }

    review = await Review.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        data: review
    })
});

//@desc    Delete Review
//@route   DELETE/api/v1/reviews/:id
//@access  Private

exports.deleteReview = asyncHandler(async (req, res, next) => {

    const review = await Review.findById(req.params.id);

    if (!review) {
        return next(new ErrorResponse(`No review with id ${req.params.id}`, 404));
    }

    // Make sure review belongs to user or user is admin
    if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorResponse(`Not authorized to delete review`, 401));
    }

    await review.remove();

    res.status(200).json({
        success: true,
        data: {}
    })
});