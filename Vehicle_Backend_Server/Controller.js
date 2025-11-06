const { sendConfirmationEmail } = require("./mailer");
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
    const exist = await signupDetails.findOne({ email });
    if (exist) {
      return res.status(403).json({ error: "Email is already in use,You can log in with this email instead." });
    }
    if (password !== confirmpassword) {
      return res.status(400).json({ error: "Passwords do not match" });
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
    console.log("Incoming booking request:", req.body);

    const {
      FullName,
      email,
      MobileNumber,
      CarModel,
      EngineType,
      SelectedServices,
      ServiceType,
      VehicleNumber,
      AppointmentDate,
      AdditionalRequirements,
    } = req.body;

    const selected = Array.isArray(SelectedServices)
      ? SelectedServices.filter(Boolean)
      : ServiceType
      ? [ServiceType]
      : [];

    const SERVICE_PRICES = {
      "General Service": 600,
      "Engine Repair": 1500,
      "Battery Jumpstart": 400,
      "Flat Tyre Repair": 350,
      "Towing Service": 1500,
      "Brake Service": 700,
      "AC Repair": 950,
      "Suspension Repair": 1800,
      "Oil Change": 400,
      "Indicators & Lights Repair": 500,
      "Windsheild Wiper Replacement": 350,
      "Wheel Alignment": 700,
      "Coolant Top-Up": 500,
      "Clutch & Gearbox": 2200,
      "Interior Cleaning": 800,
      "Exterior Wash & Polish": 600,
    };

    const base = selected.reduce((sum, service) => {
      return sum + (SERVICE_PRICES[service] || 0);
    }, 0);
    const gst = +(base * 0.18).toFixed(2);
    const serviceTax = +(base * 0.05).toFixed(2);
    const totalPrice = +(base + gst + serviceTax).toFixed(2);

    // Validate required fields
    if (
      !FullName ||
      !email ||
      !MobileNumber ||
      !CarModel ||
      !EngineType ||
      selected.length === 0 ||
      !VehicleNumber ||
      !AppointmentDate
    ) {
      return res.status(400).json({ message: "Please fill all the required fields." });
    }

    // Validate and parse appointment date
    const appointment = new Date(AppointmentDate);
    if (!appointment || isNaN(appointment.getTime())) {
      return res.status(400).json({ message: "Invalid appointment date." });
    }

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
      SelectedServices: selected,
      ServiceType: selected.join(", "),
      Price: totalPrice,
      VehicleNumber,
      AppointmentDate: appointment,
      AdditionalRequirements: AdditionalRequirements || "",
      Status: "pending",
    });

    console.log("Booking created successfully:", newBooking._id);
    res.status(201).json({ message: "Booking created", booking: newBooking });
  } catch (err) {
    console.error("Booking creation error:", err.message, err.stack);
     res.status(500).json({ message: "Internal server error", error: err.message });
  }
};

exports.bookingtoadmin=async (req,res) => {
   const appointment=await BookingSchema.find();
   return res.json(appointment);  
}

const SERVICE_PRICES = {
  "General Service": 600,
  "Engine Repair": 1500,
  "Battery Jumpstart": 400,
  "Flat Tyre Repair": 350,
  "Towing Service": 1500,
  "Brake Service": 700,
  "AC Repair": 950,
  "Suspension Repair": 1800,
  "Oil Change": 400,
  "Indicators & Lights Repair": 500,
  "Windsheild Wiper Replacement": 350,
  "Wheel Alignment": 700,
  "Coolant Top-Up": 500,
  "Clutch & Gearbox": 2200,
  "Interior Cleaning": 800,
  "Exterior Wash & Polish": 600,
};

exports.updateBookingStatus = async (req, res) => {
  const { id } = req.params;
  const { status, mechanic } = req.body;

  const validStatuses = ["accepted", "in-progress", "completed", "declined"];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  try {
    const update = { Status: status };
    if (mechanic) update.AssignedMechanic = mechanic;

    const updatedBooking = await BookingSchema.findByIdAndUpdate(id, update, { new: true });
    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    if (["accepted", "completed"].includes(status)) {
      const selected = updatedBooking.SelectedServices || [];

      const base = selected.reduce((sum, service) => {
        return sum + (SERVICE_PRICES[service] || 0);
      }, 0);
      const gst = +(base * 0.18).toFixed(2);
      const serviceTax = +(base * 0.05).toFixed(2);
      const finalAmount = +(base + gst + serviceTax).toFixed(2);

      await sendConfirmationEmail(
        updatedBooking.email,
        updatedBooking.FullName,
        updatedBooking.ServiceType,
        updatedBooking.AppointmentDate.toDateString(),
        status,
        { basePrice: base, gst, serviceTax, finalAmount }
      );
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





















