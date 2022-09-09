const express= require('express');
const mongoose= require('mongoose');
const cors= require('cors');
const bodyParser = require('body-parser');
const path = require('path')

const eventsRoute = require("./routes/events-routes")
const userRoute = require("./routes/user-routes")
const auth = require("./routes/auth")
const bookingRoute = require("./routes/booking-routes")

mongoose.connect('mongodb://127.0.0.1:27017/userdata').then((x) => {
    console.log(`connected to database "${x.connections[0].name}"`)
    }).catch((err) => {
    console.error('error connecting db', err.reason)    
})

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors(['*']));

app.use("/events",eventsRoute)
app.use("/user",userRoute)
app.use('/auth', auth)
app.use("/bookService",bookingRoute)

const port = process.env.PORT || 4000;
const server = app.listen(port,()=> console.log(`listening to port ${port}...`));