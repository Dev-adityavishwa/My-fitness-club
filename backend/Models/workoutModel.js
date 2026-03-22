const mongoose = require('mongoose');

const schema = mongoose.Schema;

// schema
const workoutSchema = new schema({
    title:{
         type: String,
         required : true
    },
    reps : {
        type : Number,
        required : true,
        min : [1 , "reps cant be less than one"]

    },
    load:{
        type : Number,
        required : true,
         min : [0 , "load can't be negative"]
    }
},
{
 timestamps : true
}
)

// table name > Workout
module.exports = mongoose.model('Workout', workoutSchema)



