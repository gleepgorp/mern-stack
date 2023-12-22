const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  }
})

// static method for signup, must be regular function to use 'this' keyword
userSchema.statics.signup = async function(email, password) {

  // validation 
  // 'npm i validator' for validating email and pass 
  if (!email || !password) {
    throw Error('All fields must be filled')
  }
  if (!validator.isEmail(email)) {
    throw Error('Invalid email')
  }
  if (!validator.isStrongPassword(password)) {
    throw Error('Password not strong enough')
  }

  // check if email exist
  const exists = await this.findOne({ email })

  if (exists) {
    throw Error('Email already exist')
  }

  // to hash password, 'npm i bcrypt' first
  // salt, to add extra string to password for extra security
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({ email, password: hash })

  return user
}

// -------------------------------*--------------------------------

// static method for login, must be regular function to use 'this' keyword
userSchema.statics.login = async function(email, password) {
  
  if (!email || !password) {
    throw Error('All fields must be filled')
  }

  // check if user exist
  const user = await this.findOne({ email })

  if (!user) {
    throw Error('Incorrect email')
  }

  // check if password is correct
  const match = await bcrypt.compare(password, user.password)

  if(!match) {
    throw Error('Incorrect password')
  }

  return user
}

module.exports = mongoose.model('User', userSchema)