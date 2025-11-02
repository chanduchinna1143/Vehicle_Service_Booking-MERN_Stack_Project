import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaTimesCircle, FaClock } from 'react-icons/fa';

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3000/bookingtoadmin", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();
        if (response.ok) {
          const sortedBookings = result.sort(
            (a, b) =>
              parseInt(b._id.toString().substring(0, 8), 16) -
              parseInt(a._id.toString().substring(0, 8), 16)
          );
          setBookings(sortedBookings);
        } else {
          setError(result.message);
        }
      } catch (err) {
        setError("Server error");
      }
    };

    fetchBookings();
  }, []);

  const handleStatusUpdate = async (id, status) => {
  try {
    const response = await fetch(`http://localhost:3000/bookings/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    const result = await response.json();
    if (response.ok) {
      if (status === "declined") {
        setBookings((prev) => prev.filter((booking) => booking._id !== id));
      } else {
        setBookings((prev) =>
          prev.map((booking) =>
            booking._id === id ? { ...booking, Status: status } : booking
          )
        );
      }
    } else {
      alert(result.message);
    }
  } catch (err) {
    alert("Failed to update status");
  }
};
  const getStatusBadge = (status) => {
    const base = "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold";
    switch (status) {
      case "accepted":
        return <span className={`${base} bg-green-100 text-green-700`}><FaCheckCircle /> Accepted</span>;
      case "declined":
        return <span className={`${base} bg-red-100 text-red-700`}><FaTimesCircle /> Declined</span>;
      default:
        return <span className={`${base} bg-yellow-100 text-yellow-700`}><FaClock /> Pending</span>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 px-6 py-10">
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12 tracking-tight">
        🚗 Admin Booking Dashboard
      </h2>

      {error && (
        <div className="max-w-md mx-auto mb-6 bg-red-100 text-red-700 px-4 py-3 rounded shadow">
          {error}
        </div>
      )}

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500 text-lg mt-20">No bookings found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 border border-gray-200 flex flex-col"
            >
              <img
                src="sbp.jpg"
                alt="Vehicle"
                className="w-full h-40 object-cover rounded-t-xl"
              />

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div className="space-y-1 text-sm text-gray-700">
                  <p><span className="font-semibold">Name:</span> {booking.FullName}</p>
                  <p><span className="font-semibold">Mobile:</span> {booking.MobileNumber}</p>
                  <p><span className="font-semibold">Car:</span> {booking.CarModel}</p>
                  <p><span className="font-semibold">Engine:</span> {booking.EngineType}</p>
                  <p><span className="font-semibold">Service:</span> {booking.ServiceType}</p>
                  <p><span className="font-semibold">Vehicle No:</span> {booking.VehicleNumber}</p>
                  <p><span className="font-semibold">Date:</span> {new Date(booking.AppointmentDate).toLocaleDateString()}</p>
                  {booking.AdditionalRequirements && (
                    <p><span className="font-semibold">Notes:</span> {booking.AdditionalRequirements}</p>
                  )}
                </div>

                <div className="mt-4">{getStatusBadge(booking.Status)}</div>
              </div>

              <div className="flex gap-2 px-5 py-4 border-t border-gray-100 bg-gray-50">
                <button
                  onClick={() => handleStatusUpdate(booking._id, "accepted")}
                  className={`flex-1 px-4 py-2 rounded-lg text-white font-medium transition ${
                    booking.Status === "accepted"
                      ? "bg-green-400 cursor-not-allowed opacity-70"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                  disabled={booking.Status === "accepted"}
                >
                  Accept
                </button>

                <button
                  onClick={() => handleStatusUpdate(booking._id, "declined")}
                  className="flex-1 px-4 py-2 rounded-lg text-white font-medium bg-red-600 hover:bg-red-700"
                >
                  Decline
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;