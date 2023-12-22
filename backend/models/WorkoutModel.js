const mongoose = require('mongoose')

const Schema = mongoose.Schema

//the schema defines the structure of the document
const workoutSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  reps: {
    type: Number,
    required: true
  },
  load: {
    type: Number,
    required: true
  },
  user_id: {
    type: String,
    required: true
  }
}, { 
  //timestamps property creates a date prop to know when the doc was crated 
  timestamps: true }) 

module.exports = mongoose.model('Workout', workoutSchema)



