import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const BookingForm = () => {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail");
  const today = new Date().toISOString().split("T")[0];

  const services = [
  { name: "General Service", price: 600 },
  { name: "Engine Repair", price: 1500 },
  { name: "Battery Jumpstart", price: 400 },
  { name: "Flat Tyre Repair", price: 350 },
  { name: "Towing Service", price: 1500 },
  { name: "Brake Service", price: 700 },
  { name: "AC Repair", price: 950 },
  { name: "Suspension Repair", price: 1800 },
  { name: "Oil Change", price: 400 },
  { name: "Indicators & Lights Repair", price: 500 },
  { name: "Windsheild Wiper Replacement", price: 350 },
  { name: "Wheel Alignment", price: 700 },
  { name: "Coolant Top-Up", price: 500 },
  { name: "Clutch & Gearbox", price: 2200 },
  { name: "Interior Cleaning", price: 800 },
  { name: "Exterior Wash & Polish", price: 600 },
];

  const [formData, setFormData] = useState({
    name: "",
    number: "",
    carModel: "",
    engineType: "",
    selectedServices: [],
    vehicleNumber: "",
    date: "",
    notes: "",
  });

  const [totalPrice, setTotalPrice] = useState(0);
  const [gst, setGst] = useState(0);
  const [serviceTax, setServiceTax] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);
  const [error, setError] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);


  useEffect(() => {
    const base = formData.selectedServices.reduce((sum, serviceName) => {
      const service = services.find((s) => s.name === serviceName);
      return sum + (service ? service.price : 0);
    }, 0);

    const gstAmount = +(base * 0.18).toFixed(2);
    const serviceTaxAmount = +(base * 0.05).toFixed(2);
    const final = +(base + gstAmount + serviceTaxAmount).toFixed(2);

    setTotalPrice(base);
    setGst(gstAmount);
    setServiceTax(serviceTaxAmount);
    setFinalAmount(final);
  }, [formData.selectedServices]);

  const handleServiceSelect = (serviceName) => {
    setFormData((prev) => {
      const alreadySelected = prev.selectedServices.includes(serviceName);
      return {
        ...prev,
        selectedServices: alreadySelected
          ? prev.selectedServices.filter((s) => s !== serviceName)
          : [...prev.selectedServices, serviceName],
      };
    });
  };

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
        SelectedServices: formData.selectedServices,
        ServiceType: "Vehicle Service",
        Price: finalAmount,
        VehicleNumber: formData.vehicleNumber,
        AppointmentDate:formData.date,
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
          selectedServices: [],
          vehicleNumber: "",
          date: "",
          notes: "",
        });

        Swal.fire({
          icon: "success",
          title: "Booking Confirmed!",
          text: "Your appointment has been successfully scheduled.",
          confirmButtonColor: "#2563eb",
          confirmButtonText: "Go to Status",
        }).then(() => {
          navigate("/userstatus");
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 px-6 py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl p-10 w-full max-w-2xl border border-blue-100 transition-transform transform hover:scale-[1.01]"
      >
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-blue-700 mb-8">
          Vehicle Service Booking
        </h2>
        <div className="grid md:grid-cols-2 gap-5">
          <input name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Full Name"
            className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-400 outline-none transition"
          />
          <input
            name="number"
            value={formData.number}
            onChange={handleChange}
            required
            placeholder="Mobile Number"
            className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-400 outline-none transition"
          />
          <input
            name="vehicleNumber"
            value={formData.vehicleNumber}
            onChange={handleChange}
            required
            placeholder="Vehicle Number"
            className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-400 outline-none transition"
          />
          <input
            type="date"
            name="date"
            min={today}
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-400 outline-none transition"
          />
          <select
            name="carModel"
            value={formData.carModel}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-400 outline-none transition"
          >
            <option value="">Select Car Model</option>
            <option>Honda Amaze</option>
            <option>Honda Amaze 2nd Gen</option>
            <option>Honda City</option>
            <option>Honda City Hybrid</option>
            <option>Honda Elevate</option>
            <option>Honda Elevate Hybrid</option>
            <option>Honda HR-V</option>
            <option>Honda CR-V</option>
            <option>Honda WR-V</option>
            <option>Honda BR-V</option>
            <option>Honda Accord</option>
            <option>Honda e:Ny1 (Electric SUV)</option>
            <option>Honda 0 Alpha (EV)</option>
          </select>
          <select
            name="engineType"
            value={formData.engineType}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-400 outline-none transition"
          >
            <option value="">Select Engine Type</option>
            <option>Petrol</option>
            <option>Diesel</option>
            <option>Electric</option>
            <option>Hybrid</option>
          </select>
        </div>

        <div className="mt-8 relative">
  <label className="block text-lg font-semibold text-blue-800 mb-3">
    Select Services
  </label>

  <div className="relative">
    {/* Dropdown button */}
    <button
      type="button"
      onClick={() => setShowDropdown((prev) => !prev)}
      className="w-full border border-gray-300 bg-white rounded-xl p-3 text-left focus:ring-2 focus:ring-blue-400 outline-none flex justify-between items-center transition"
    >
      {formData.selectedServices.length > 0
        ? `${formData.selectedServices.length} service(s) selected`
        : "Select Services"}
      <svg
        className={`w-5 h-5 transform transition-transform ${
          showDropdown ? "rotate-180" : "rotate-0"
        }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>

    {/* Dropdown options */}
    {showDropdown && (
      <div className="absolute z-10 mt-2 w-full bg-white border border-blue-100 rounded-xl shadow-xl max-h-60 overflow-y-auto">
        {services.map((service) => (
          <label
            key={service.name}
            className="flex items-center justify-between px-4 py-2 hover:bg-blue-50 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                value={service.name}
                checked={formData.selectedServices.includes(service.name)}
                onChange={(e) => handleServiceSelect(service.name)}
                className="accent-blue-600 w-4 h-4"
              />
              <span className="text-gray-800">{service.name}</span>
            </div>
            <span className="text-gray-500 text-sm">₹{service.price}</span>
          </label>
        ))}
      </div>
    )}
  </div>

  {/* Display selected service tags */}
  {formData.selectedServices.length > 0 && (
    <div className="flex flex-wrap gap-2 mt-3">
      {formData.selectedServices.map((service) => (
        <span
          key={service}
          className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm shadow-sm"
        >
          {service}
        </span>
      ))}
    </div>
  )}
</div>


 
        {formData.selectedServices.length > 0 && (
          <div className="bg-blue-50 mt-6 p-5 rounded-2xl border border-blue-200">
            <h4 className="font-semibold text-blue-700 mb-2">Price Summary</h4>
            <div className="space-y-1 text-gray-700">
              <p>Base Price: ₹{totalPrice}</p>
              <p>GST (18%): ₹{gst}</p>
              <p>Service Tax (5%): ₹{serviceTax}</p>
              <p className="font-bold text-lg text-blue-800 border-t pt-2">
                Total: ₹{finalAmount}
              </p>
            </div>
          </div>
        )}

        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Additional Requirements or Notes"
          rows="3"
          className="w-full border border-gray-300 rounded-xl p-3 mt-6 focus:ring-2 focus:ring-blue-400 outline-none transition"
        />


        <button
          type="submit"
          className="w-full mt-8 py-3 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-2xl shadow-lg transition-all"
        >
          Book Appointment
        </button>

        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
      </form>
    </div>
  );
};

export default BookingForm;
