const validateUserAuthSignUp = (req, res, next) => {
    if(!req.body.name || !req.body.email || !req.body.password) {
        return res.status(400).json({
            success: false,
            data: {},
            message: 'Something went wrong in middleware',
            err: 'Email or name or password missing in the request'
        });
    }
    next();
}

const validateUserAuthSignIn = (req, res, next) => {
    if(!req.body.email || !req.body.password) {
        return res.status(400).json({
            success: false,
            data: {},
            message: 'Something went wrong in middleware',
            err: 'Email or name or password missing in the request'
        });
    }
    next();
}

module.exports = {
    validateUserAuthSignUp,
    validateUserAuthSignIn,
}