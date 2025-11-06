import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const sec = [
  {
    image: "/general.jpg",
    title: "General Service",
    description: "Routine maintenance including oil change, filter replacement and inspection",
    price: "₹600–₹900",
  },
  {
    image: "/enginerepair.jpg",
    title: "Engine Repair",
    description: "Diagnostics and repair for engine-related issues",
    price: "₹1,500–₹3,000",
  },
  {
    image: "/battery.jpg",
    title: "Battery Jumpstart",
    description: "On-site battery boost for dead or low batteries",
    price: "₹300–₹600",
  },
  {
    image: "/tyre.jpg",
    title: "Flat Tyre Repair",
    description: "Quick fix or replacement of punctured tyres",
    price: "₹250–₹500",
  },
  {
    image: "/towing.jpg",
    title: "Towing Service",
    description: "Emergency towing to nearest service center",
    price: "₹1,000–₹2,000",
  },
  {
    image: "/brake.jpg",
    title: "Brake Service",
    description: "Brake pad replacement and system check",
    price: "₹700–₹1,200",
  },
  {
    image: "/AC.jpg",
    title: "AC Repair",
    description: "Cooling system diagnostics and gas refill",
    price: "₹900–₹1,500",
  },
  {
    image: "/Suspension.png",
    title: "Suspension Repair",
    description: "Inspect and fix shocks, struts, and suspension components",
    price: "₹1,200–₹2,500",
  },
  {
    image: "/oilchange.jpg",
    title: "Oil Change",
    description: "Replace engine oil and oil filter for smoother performance",
    price: "₹400–₹700",
  },
  {
    image: "/lights.jpg",
    title: "Indicators & Lights Repair",
    description: "Fix or replace faulty lights and indicators",
    price: "₹300–₹600",
  },
  {
    image: "/wiper.jpg",
    title: "Windsheild Wiper Replacement",
    description: "Install new wipers for better visibility during rain",
    price: "₹250–₹500",
  },
  {
    image: "/wheelalignment.png",
    title: "Wheel Alignment",
    description: "Adjust wheel angles to reduce tire wear and improve handling",
    price: "₹500–₹900",
  },
  {
    image: "/coolant.jpg",
    title: "Coolant Top-Up",
    description: "Refill or replace coolant to prevent engine overheating",
    price: "₹300–₹600",
  },
  {
    image: "/gearbox.jpg",
    title: "Clutch & Gearbox",
    description: "Routine maintenance including oil change, filter replace",
    price: "₹1,200–₹2,800",
  },
  {
    image: "/interior.jpg",
    title: "Interior Cleaning",
    description: "Deep clean seats, dashboards, and cabin surfaces.",
    price: "₹500–₹1,000",
  },
  {
    image: "/Exterior.jpg",
    title: "Exterior Wash & Polish",
    description: "Full body wash with polish for shine and protection",
    price: "₹400–₹800",
  },
];

function Services() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleBookClick = (serviceType) => {
    if (!isLoggedIn) {
      toast.warn("Please log in to book a service!");
      navigate("/login");
    } else {
      navigate("/booking", { state: { selectedService: serviceType } });
    }
  };

  return (
    <div className="px-8 py-4 space-y-8">
      <section>
        <h2 className="text-3xl font-semibold text-center">Our Services</h2>
      </section>

      <section className="grid grid-cols-4 gap-x-8 gap-y-8">
        {sec.map((item, index) => (
          <div
            className="rounded-2xl h-auto border border-black shadow-xl inset-shadow-sm flex flex-col items-center p-4 justify-between space-y-4"
            key={index}
          >
            <img src={item.image} alt={item.title} className="rounded-4xl h-50" />
            <h3 className="font-bold text-2xl text-center">{item.title}</h3>
            <p className="text-center">{item.description}</p>
            <p className="text-center text-lg font-semibold">{item.price}</p>
            <button
              onClick={() => handleBookClick(item.title)}
              className="bg-amber-300 text-black px-4 py-2 rounded hover:bg-amber-400"
            >
              Book Now
            </button>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Services;