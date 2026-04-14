
const express = require('express')
const router = express.Router()

const requireAuth = require('../middleware/requireAuth')

// this is the schema inserting here for the api's
const Workout = require('../Models/workoutModel')
const { createWorkout, getWorkouts, getWorkout, deleteWorkout, updateWorkout } = require('../controllers/workoutController')
// for the scope of the app (defined in server.js)
// create a one own router 


router.use(requireAuth) // this will run for all the routes defined below it ( it will check if the user is authenticated or not ) if the user is not authenticated then it will return 401 error ( unauthorized ) and if the user is authenticated then it will call the next middleware ( which is the controller function )
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
