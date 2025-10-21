const e = require("express");
const app=e();
const cors=require("cors")
const mongoose = require("mongoose");
require("dotenv").config();
const { newuser, login, createBooking, bookingtoadmin , getUserBookingStatus, updateBookingStatus} = require("./Controller");

app.use(e.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("Database Connected...")) 
.catch((err)=>console.log(err.message))

app.post('/newuser',newuser)
app.post('/login',login)
app.post('/createbooking',createBooking)
app.get('/bookingtoadmin',bookingtoadmin)

app.patch("/bookings/:id/status",updateBookingStatus);
app.get("/userstatus", getUserBookingStatus);




app.listen(3000,()=>{console.log("server running on http://localhost:3000")})
 