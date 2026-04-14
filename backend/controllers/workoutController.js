const Workout = require('../Models/workoutModel')

const mongoose = require('mongoose')



// get all workouts 
exports.getWorkouts = async (req, res) => {
    //  .find works as the filter cndn also > > .find({reps : 15})  = find all the workouts which has reps 15
    // const workouts = await Workout.find({reps : 15})
    // .sort > makes the value sort ( createdAt is in every data & -1 making the last added at the top ( descending order )
    try {
        const user_id = req.User._id; // we need to get the user id from the request object ( we are attaching the user to the request object in the requireAuth middleware )
        const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 });

        if (workouts.length === 0)
            return res.status(400).json({ error: "No entries found" })
        res.status(200).json(workouts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

};


//get single workouts by : id

exports.getWorkout = async (req, res) => {

    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid ID" });
    }
    try {
        const workout = await Workout.findById(id);
        if (!workout)
            return res.status(404).json({ error: "Not found such workout" });
        res.status(200).json({ workout })
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

};


// post (create ) new workouts

exports.createWorkout = async (req, res) => {
    //  using async-await because it might be take some time as it is working with database 
    const { title, load, reps } = req.body

    // this is doing just for Error handling
    let emptyFields = [];
    if (!title) {
        emptyFields.push('title is missing')

    } else if (!load) {
        emptyFields.push('load is missing')

    } else if (!reps) {
        emptyFields.push('reps is missing')

    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: `Please fill out the fields`, emptyFields })
    }  // need to show on frontend 

    // add doc to the db
    try {
        const user_id = req.User._id; // we need to get the user id from the request object ( we are attaching the user to the request object in the requireAuth middleware )
        const workout = await Workout.create({ title, load, reps, user_id }) //create new row in the schema (destructuring)
        res.status(200).json(workout)

    } catch (err) {
        res.status(400).json({
            error: err.message
        })
    }

}




// delete the workout by id

exports.deleteWorkout = async (req, res) => {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid ID" });
    }
    try {
        const workout = await Workout.findByIdAndDelete(id);
        if (!workout)
            return res.status(404).json({ error: "Not found such workout" });
        res.status(200).json({ workout, message: "deleted successfully" })
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


// update the workout by id 

exports.updateWorkout = async (req, res) => {

    const { id } = req.params;
    const { title, reps, load } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "invalid ID" })
    }

    // Check if body is empty
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: "No update data provided" });
    }
    try {

        const updated = await Workout.findByIdAndUpdate(
            id,
            { title, reps, load },
            { new: true, runValidators: true }  // ensures correct type of entry
        );
        // Workout.findOneAndUpdate(
        //     { _id: id },
        //     { $set: req.body },
        //     { new: true, runValidators: true }
        // );
        if (!updated) {
            return res.status(404).json({ error: "Workout not found" });
        }
        res.status(200).json(updated)

    } catch (err) {
        res.status(400).json({ err: err.message });
    }

}




