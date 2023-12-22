require('dotenv').config();

//require
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')


//express app 
const app = express()

//global middleware
app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
})

//routes / route handler
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)


//connect to db
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  //listen for request
  app.listen(process.env.PORT, () => {
    console.log('connected to db & Listening on port 4000');
  })
})
.catch((error) => {
  console.log(error)
})

process.env