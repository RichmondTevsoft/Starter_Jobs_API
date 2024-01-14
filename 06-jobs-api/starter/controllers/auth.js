const User = require('../models/User');  //Import userModel
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, UnauthenticatedError} = require('../errors')
// const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
    const {name, email, password} = req.body;

    
    //Hash Password
    // const salt = await bcrypt.genSalt(10);
    // const hashPassword = await bcrypt.hash(password, salt);

    // const tempUser = {name, email, password:hashPassword}

 

    //Validation
    if(!name || !email || !password){
      throw new BadRequestError('Please provide name, email and password')
    }
    const user = await User.create({ ...req.body })
    //JWT Token
    // const token = jwt.sign({userID:user._id, name:user.name}, 'jwtSecret', {expiresIn: '30d'})
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({ user: {name:user.getName(), email:user.email}, token })



}





const login = async (req, res) => {
    const {email, password} = req.body

    if(!email || !password){
        throw new BadRequestError('Please provide email and password');
    }
    //Check user
    const user = await User.findOne({email})

    if (!user){
        throw new UnauthenticatedError('No email exist')
    }

    //compare password
    const isPasswordCorrect = await user.comparePassword(password)
    if(!isPasswordCorrect){
        throw new UnauthenticatedError('Password do not match')
    }

    //Create JWT
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({user:{name: user.email}, token:token})
}

module.exports = {
    register,
    login
}