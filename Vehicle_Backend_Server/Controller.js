const signupDetails =require('./signModel')
const BookingSchema = require('./AppModel')

exports.newuser=async (req,res) => {
     const {name,email,password}=req.body;
     if(!name || !email || !password){
         return res.status(403).json({error:"Fill all fields"})
     }

     const exist = await signupDetails.findOne({email});
     if(exist){
        return res.status(403).json({error:"Email is in use"})
     }else{
        const newuser=new signupDetails({name,email,password});
        await newuser.save();
        return res.status(201).json({
          message: "User created successfully",
          userId: newuser._id,
          email: newuser.email
     } )
}}

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(403).json({ error: "Fill all fields" });
  }

  const exist = await signupDetails.findOne({ email });
  if (!exist) {
    return res.status(404).json({ message: "User not found" });
  }

  if (exist.password !== password) {
    return res.status(401).json({ message: "Password incorrect" });
  }
  const isAdmin = email === "admin@gmail.com" && password === "admin";
  return res.status(200).json({
    message: "Login successful",
    role: isAdmin ? "admin" : "user"
  });
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
  const {email} = req.query;
  try {
    const bookings = await BookingSchema.find({ email });
    res.status(200).json(bookings || []);
  } catch (err) {
    console.error("Status fetch error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};













