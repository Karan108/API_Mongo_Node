//@desc    Get all bootcamps
//@route   GET/api/v1/bootcamps
//@access  public
exports.getBootcamps = (req, res, next) => {
    res.status(200).json({ success: false, msg: 'Show all bootcamps' });
}

//@desc    Get single bootcamp
//@route   GET/api/v1/bootcamps/:id
//@access  public
exports.getBootcamp = (req, res, next) => {
    res.status(200).json({ success: false, msg: `Get bootcamp ${req.params.id}` });
}

//@desc    Create new bootcamp
//@route   POST/api/v1/bootcamps
//@access  private
exports.createBootcamp = (req, res, next) => {
    res.status(200).json({ success: false, msg: 'Create new bootcamp' })
}

//@desc    update bootcamp
//@route   PUT/api/v1/bootcamps/:id
//@access  private
exports.updateBootcamp = (req, res, next) => {
    res.status(200).json({ success: false, msg: `Update bootcamp ${req.params.id}` })
}

//@desc    Delete new bootcamp
//@route   DELETE/api/v1/bootcamps/:id
//@access  private
exports.deleteBootcamp = (req, res, next) => {
    res.status(200).json({ success: false, msg: `Delete bootcamp ${req.params.id}` })
}