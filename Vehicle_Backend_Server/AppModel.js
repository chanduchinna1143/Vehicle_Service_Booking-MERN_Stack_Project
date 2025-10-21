const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  FullName: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  MobileNumber: { type: Number, required: true },
  CarModel: { type: String, required: true },
  EngineType: { type: String, required: true },
  ServiceType: { type: String, required: true },
  VehicleNumber: { type: String, required: true, uppercase: true },
  AppointmentDate: { type: Date, required: true },
  AdditionalRequirements: { type: String, default: "" },
  Status: {
    type: String,
    enum: ['pending', 'accepted', 'declined'],
    default: 'pending',
  },
});

module.exports = mongoose.model("BookingDetail", BookingSchema);