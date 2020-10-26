const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('access denied');

    try {
        const verify = jwt.verify(token, process.env.TokenSecret);
        req.user = verify;
        next();
    } catch (error) {
        res.status(400).send('invalid token');        
    }
}