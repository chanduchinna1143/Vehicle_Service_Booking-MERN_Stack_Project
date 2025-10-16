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
        return res.send(newuser);
     } 
}

exports.login=async (req,res) => {
   const {email,password} = req.body;
   if(!email || !password){
      return res.status(403).json({error:"Fill all feilds"})
   }
   const exist = await signupDetails.findOne({email});
   if(exist){
     if(exist.password == password){
       return res.status(200).json({ message: "Login successful"})
   }else{
        return res.status(404).json({message:"password incorrect"})
   }}else{
      return res.status(404).json({message:"user not found"})
   }
   
     
}

exports.createBooking = async (req, res) => {
  try {
    const {
      FullName,
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
      !MobileNumber ||
      !CarModel ||
      !EngineType ||
      !ServiceType ||
      !VehicleNumber ||
      !AppointmentDate
    ) {
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
      MobileNumber,
      CarModel,
      EngineType,
      ServiceType,
      VehicleNumber,
      AppointmentDate: appointment,
      AdditionalRequirements: AdditionalRequirements || "",
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

exports.adminlogin=async(req,res)=>{
  const {email,password}=req.body;
  if (email === 'admin@gmail.com' && password === 'admin123') {
    return res.status(200).json({ success: true, message: 'Login successful' });
  } else {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

}
