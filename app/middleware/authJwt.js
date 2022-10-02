const jwt = require("jsonwebtoken");
const { secret } = require("../../config/general.config");

const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, secret, (err, user) => {
            if (err) {
                return res.status(403).json({message: 'Invalid token!'});
            }

            req.userId = user.id;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

module.exports = authenticateJWT;