//auth middleware
import passport from 'passport';

const authenticate = (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (err, user) => {
        if (err) next(err);
        if (!user) {
            return res.status(401).json({
                message: "Unauthorized access. Please login",
            });
        }
        req.user = user;
        next();
    })(req, res, next);
}

export default authenticate;