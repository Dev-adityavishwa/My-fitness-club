
const express = require('express')

// for the scope of the app (defined in server.js)
// create a one own router 
const router = express.Router()

// this is the schema inserting here for the api's
const Workout = require('../Models/workoutModel')
const { createWorkout, getWorkouts, getWorkout, deleteWorkout, updateWorkout } = require('../controllers/workoutController')
/**
 * Route : /api/workout
 * method : GET
 * Desc : get all workouts
 * access : Public
 * Params : none
 */

router.get('/', getWorkouts);

/**
 * Route : /api/workout/id
 * method : GET
 * Desc : get single workouts
 * access : Public
 * Params : id
 */

router.get('/:id', getWorkout);


/**
 * Route : /api/workout
 * method : POST
 * Desc : Create new workouts
 * access : Public
 * Params : none
 */

router.post('/', createWorkout);



/**
 * Route : /api/workout
 * method : DELETE
 * Desc : delete the perticular workouts
 * access : Public
 * Params : id
 */

router.delete('/:id', deleteWorkout);

/**
 * Route : /api/workout
 * method : patch
 * Desc : update by workout by id 
 * access : Public
 * Params : id
 */

router.patch('/:id', updateWorkout);


module.exports = router
