const signupDetails =require('./signModel')
const BookingSchema = require('./AppModel')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {verifyToken} = require('./middlewear');



exports.newuser = async (req, res) => {
  try {
    const { name, email, password, confirmpassword } = req.body;
    if (!name || !email || !password || !confirmpassword) {
      return res.status(403).json({ error: "Fill all fields" });
    }
    if (password !== confirmpassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }
    const exist = await signupDetails.findOne({ email });
    if (exist) {
      return res.status(403).json({ error: "Email is already in use" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newuser = new signupDetails({name,email,password:hashedPassword,confirmpassword:hashedPassword});
    await newuser.save();
    return res.status(201).json({
      message: "User created successfully",
      userId: newuser._id,
      email: newuser.email,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(403).json({ message: "Fill all fields" });
    }

    const user = await signupDetails.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const PasswordMatch = await bcrypt.compare(password, user.password);
    if (!PasswordMatch) {
      return res.status(401).json({ message: "Password incorrect" });
    }
    const token = jwt.sign({ email: user.email, role: user.role }, "mysecretkey", { expiresIn: "1h"});
    const isAdmin = email === "admin@gmail.com";
    res.status(200).json({
      message: "Login successful",
      role: isAdmin ? "admin" : "user",
      token, 
      email: user.email, 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.createBooking = async (req, res) => {
  try {
    const {
      FullName,
      email, 
      MobileNumber,
      CarModel,
      EngineType,
      ServiceType,
      VehicleNumber,
      AppointmentDate,
      AdditionalRequirements,
      
    } = req.body;

    if (
      !FullName ||
      !email ||
      !MobileNumber ||
      !CarModel ||
      !EngineType ||
      !ServiceType ||
      !VehicleNumber ||
      !AppointmentDate 
    ){
      return res
        .status(400)
        .json({ message: "Please fill all the required fields." });
    }

    const appointment = new Date(AppointmentDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (appointment < today) {
      return res.status(400).json({ message: "Cannot book for past dates." });
    }

    const newBooking = await BookingSchema.create({
      FullName,
      email,
      MobileNumber,
      CarModel,
      EngineType,
      ServiceType,
      VehicleNumber,
      AppointmentDate: appointment,
      AdditionalRequirements: AdditionalRequirements || "",
      Status: "pending",
      
    });

    res.status(201).json({ message: "Booking created", booking: newBooking });
  } catch (err) {
    console.error("Booking creation error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.bookingtoadmin=async (req,res) => {
   const appointment=await BookingSchema.find();
   return res.json(appointment);  
}

exports.updateBookingStatus = async (req, res) => {
  const {id} = req.params;
  const {status} = req.body; 

  if (!['accepted', 'declined'].includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  try {
    const updatedBooking = await BookingSchema.findByIdAndUpdate(
      id,
      {Status: status},
      {new: true}
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ message: "Status updated", booking: updatedBooking });
  } catch (err) {
    console.error("Status update error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.getUserBookingStatus = async (req, res) => {
  try {
    const email = req.user.email;
    if (!email) {
      return res.status(400).json({ message: "User email not found in token" });
    }
    const bookings = await BookingSchema.find({ email });
    res.status(200).json(bookings || []);
  } catch (err) {
    console.error("Status fetch error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};














