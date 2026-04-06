const express = require('express')
const dotenv = require('dotenv')
const workoutRoutes = require('./routes/workout')
const userRoutes = require('./routes/user')
const mongoose = require('mongoose')

dotenv.config()

const app = express()

// middleware
app.use(express.json())  // for the send data in req.body
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})


app.use('/api/workouts', workoutRoutes) 
app.use('/api/user', userRoutes) 
// app.use('/admin', adminroute ) // if you want to create another route 


// connect db
const PORT = process.env.PORT;
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running at: ${PORT} `)
        })
    })
    .catch((error) => { console.log(error) })











