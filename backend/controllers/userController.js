const User = require('../models/UserModel')
//npm i jsonwebtoken for authentication
const jwt = require('jsonwebtoken')

// this func will generate token for loginuser and signupuser controller function
const createToken = (_id) => {
  //go to env file and type SECRET='random string'
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}


// login user -------------------------------
const loginUser = async (req, res) => {
  const {email, password} = req.body
  
  try {
    const user = await User.login(email, password)

    // create token
    const token = createToken(user._id)

    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }

  //res.json({mssg: 'Login user'})
}


// signing up a user -------------------------------  
const signupUser = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.signup(email, password)

    // create token
    const token = createToken(user._id)

    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
  
  // res.json({mssg: 'Signup user'}) 
}

module.exports = {signupUser, loginUser}

