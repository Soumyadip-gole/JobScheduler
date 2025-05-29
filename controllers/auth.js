const userschema = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const customerror = require('../errors/customerror')


const register = async (req, res) => {
    const user = await userschema.create({ ...req.body })
    const token = user.token()
    res.status(StatusCodes.CREATED).json({name:user.name, token: token})
}

const login = async (req, res) => {

    if(!req.body.email||!req.body.password) {
        throw new customerror('Please provide email and password', StatusCodes.BAD_REQUEST)
    }

    const user = await userschema.findOne({email: req.body.email})

    if(!user){
        throw new customerror('Invalid Credentials', StatusCodes.UNAUTHORIZED)
    }

    const correctpassword = await user.comparepassword(req.body.password)
    if(!correctpassword){
        throw new customerror('Invalid Credentials', StatusCodes.UNAUTHORIZED)
    }

    const token = user.token()

    res.status(StatusCodes.ACCEPTED).json({name:user.name, token: token})
}

module.exports = {
    register,
    login
}

