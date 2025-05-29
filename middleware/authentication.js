require('dotenv').config();
const jwt = require("jsonwebtoken");
const customerror = require('../errors/customerror')

const auth = async (req, res, next) => {
    if(!req.headers.authorization||!req.headers.authorization.startsWith('Bearer ')){
        throw new customerror('missing token',401)
    }
    const token = req.headers.authorization.split(' ')[1]
    try{
        const payload = jwt.verify(token,process.env.secret)
        req.user=payload;
    }catch (error) {
        throw new customerror('Authentication invalid',401)
    }
    next()
}
module.exports = auth