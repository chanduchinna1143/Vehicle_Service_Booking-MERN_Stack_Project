import React, { useEffect, useState } from "react";

const UserStatusPage = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No token found. Please log in again.");
          return;
        }
        const response = await fetch("http://localhost:3000/userstatus", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();

        if (response.ok) {
          setBookings(result);
        } else {
          setError(result.message || "Failed to fetch bookings");
        }
      } catch (err) {
        setError("Server error. Please try again later.");
      }
    };

    fetchStatus();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-blue-200 px-6 py-12 relative overflow-hidden">
      <div className="absolute w-80 h-80 bg-blue-300 opacity-20 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
      <div className="absolute w-[28rem] h-[28rem] bg-indigo-300 opacity-20 rounded-full blur-3xl bottom-10 right-10 animate-pulse"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <h2 className="text-5xl font-extrabold text-center text-blue-700 mb-10">
          📋 Your Booking Status
        </h2>

        {error && (
          <p className="text-center text-red-600 text-xl font-semibold bg-red-100 py-3 rounded-lg">
            {error}
          </p>
        )}

        {bookings.length === 0 && !error ? (
          <p className="text-center text-gray-700 text-xl">
            No bookings found.
          </p>
        ) : (
          <div className="space-y-8">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="space-y-4 bg-white p-8 rounded-3xl shadow-2xl border border-gray-300 hover:shadow-blue-300 transition-shadow text-lg"
              >
                <p><strong>Full Name:</strong> {booking.FullName}</p>
                <p><strong>Vehicle Number:</strong> {booking.VehicleNumber}</p>
                <p><strong>Car Model:</strong> {booking.CarModel}</p>
                <p><strong>Service:</strong> {booking.ServiceType}</p>
                <p><strong>Date:</strong> {new Date(booking.AppointmentDate).toLocaleDateString()}</p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`px-4 py-2 rounded-full text-white font-bold text-lg ${
                      booking.Status === "accepted"
                        ? "bg-green-500"
                        : booking.Status === "declined"
                        ? "bg-red-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {booking.Status}
                  </span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserStatusPage;
