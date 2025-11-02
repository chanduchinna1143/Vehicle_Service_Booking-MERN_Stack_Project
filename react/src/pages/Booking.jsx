import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    carModel: "",
    engineType: "",
    serviceType: "",
    vehicleNumber: "",
    date: "",
    notes: "",
  });

  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail");

  const [error, setError] = useState("");
  const today = new Date().toISOString().split("T")[0];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!userEmail) {
      setError("User email not found. Please log in again.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/createbooking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          FullName: formData.name,
          email: userEmail,
          MobileNumber: formData.number,
          CarModel: formData.carModel,
          EngineType: formData.engineType,
          ServiceType: formData.serviceType,
          VehicleNumber: formData.vehicleNumber,
          AppointmentDate: formData.date,
          AdditionalRequirements: formData.notes,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setFormData({
          name: "",
          number: "",
          carModel: "",
          engineType: "",
          serviceType: "",
          vehicleNumber: "",
          date: "",
          notes: "",
        });

        Swal.fire({
          icon: 'success',
          title: 'Booking Confirmed!',
          text: 'Your appointment has been successfully scheduled.',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Go to Status',
        }).then(() => {
          navigate('/userstatus');
        });
      } else {
        setError(result.message || "Something went wrong");
      }
    } catch (err) {
      console.error("Error submitting booking:", err);
      setError("Failed to connect to server");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-indigo-100 to-blue-200 px-4 relative overflow-hidden">
      <div className="absolute w-72 h-72 bg-blue-300 opacity-20 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
      <div className="absolute w-96 h-96 bg-indigo-300 opacity-20 rounded-full blur-3xl bottom-10 right-10 animate-pulse"></div>

      <form
        onSubmit={handleSubmit}
        className="relative bg-white shadow-2xl rounded-3xl p-10 w-full max-w-2xl space-y-6 transition-all duration-300 hover:shadow-[0_0_40px_rgba(59,130,246,0.3)] z-10"
      >
        <div className="text-center">
          <h2 className="text-4xl font-bold text-blue-700">🚗 Vehicle Booking</h2>
          <p className="text-gray-500 mt-2 text-sm">
            Schedule your next car service appointment below.
          </p>
        </div>

        <div className="flex flex-col">
          <label className="font-semibold text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold text-gray-700 mb-1">Mobile Number</label>
          <input
            type="tel"
            name="number"
            value={formData.number}
            onChange={handleChange}
            placeholder="Enter your number"
            required
            pattern="[0-9]{10}"
            title="Enter 10-digit number"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold text-gray-700 mb-1">Car Model</label>
          <select
            name="carModel"
            value={formData.carModel}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          >
            <option value="">Select Car Model</option>
            <option>Honda Amaze</option>
            <option>Honda City</option>
            <option>Honda Elevate</option>
            <option>Honda Jazz</option>
            <option>Honda WR-V</option>
            <option>Honda Civic</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="font-semibold text-gray-700 mb-1">Engine Type</label>
          <select
            name="engineType"
            value={formData.engineType}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          >
            <option value="">Select Engine Type</option>
            <option>Petrol</option>
            <option>Diesel</option>
            <option>CNG</option>
            <option>Hybrid</option>
            <option>Electric</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="font-semibold text-gray-700 mb-1">Service Type</label>
          <select
            name="serviceType"
            value={formData.serviceType}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          >
            <option value="">Select Service</option>
            <option>General Service</option>
            <option>Engine Repair</option>
            <option>Brake Service</option>
            <option>AC Repair</option>
            <option>Oil Change</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="font-semibold text-gray-700 mb-1">Vehicle Number</label>
          <input
            type="text"
            name="vehicleNumber"
            value={formData.vehicleNumber}
            onChange={handleChange}
            placeholder="e.g., AP01AB1234"
            required
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold text-gray-700 mb-1">Appointment Date</label>
          <input
            type="date"
            name="date"
            min={today}
            value={formData.date}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold text-gray-700 mb-1">Additional Requirements</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Any special instructions..."
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            rows="3"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-6 rounded-lg bg-blue-600 text-white font-semibold text-lg hover:bg-blue-700 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-transform"
        >
          Book Appointment
        </button>

        {error && <div className="text-red-600 text-center mt-2">{error}</div>}
      </form>
    </div>
  );
};

export default BookingForm;