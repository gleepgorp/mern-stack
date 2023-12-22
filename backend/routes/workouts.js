//mongodb access password: Da5N8dRinsOiwope
const express = require('express')
const {
  createWorkout,
  getWorkout,
  getWorkouts,
  deleteWorkout,
  updateWorkout
} = require('../controllers/workoutController')
const requireAuth = require('../middleware/requireAuth')

// require auth for all workout routes
const router = express.Router()

router.use(requireAuth)

//GET all workouts
router.get('/', getWorkouts)

//GET a single workout
router.get('/:id', getWorkout)

//POST a new workout
router.post('/', createWorkout)

//DELETE a  workout
router.delete('/:id', deleteWorkout)

//UPDATE a new workout
router.patch('/:id', updateWorkout)

module.exports = router

//note: if handling post or patch request, where data is sent to the server like sending a new workout to the server, access it through the req object, but can only be accessed through a middleware in an express app, Express.json is the middleware