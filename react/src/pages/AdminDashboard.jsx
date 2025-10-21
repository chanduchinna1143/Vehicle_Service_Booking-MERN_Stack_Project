import React, { useEffect, useState } from 'react';

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("http://localhost:3000/bookingtoadmin");
        const result = await response.json();
        if (response.ok) {
          const sortedBookings = result.sort((a, b) => new Date(a.AppointmentDate) - new Date(b.AppointmentDate));
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
        setBookings((prev) =>
          prev.map((booking) =>
            booking._id === id ? { ...booking, Status: status } : booking
          )
        );
      } else {
        alert(result.message);
      }
    } catch (err) {
      alert("Failed to update status");
    }
  };

  return (
    <div className="px-8 py-6 bg-gray-50 min-h-screen">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">
        Appointment Requests
      </h2>

      {error && (
        <p className="text-center text-red-500 font-semibold mb-4">{error}</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 flex flex-col justify-between hover:shadow-xl transition"
          >
            <img
              src="sbp.jpg"
              alt="Vehicle"
              className="rounded-xl w-full h-40 object-cover mb-4"
            />
            <div className="space-y-2 text-gray-700 text-sm">
              <p><span className="font-semibold">Name:</span> {booking.FullName}</p>
              <p><span className="font-semibold">Mobile:</span> {booking.MobileNumber}</p>
              <p><span className="font-semibold">Car Model:</span> {booking.CarModel}</p>
              <p><span className="font-semibold">Engine:</span> {booking.EngineType}</p>
              <p><span className="font-semibold">Service:</span> {booking.ServiceType}</p>
              <p><span className="font-semibold">Vehicle No:</span> {booking.VehicleNumber}</p>
              <p><span className="font-semibold">Date:</span> {new Date(booking.AppointmentDate).toLocaleDateString()}</p>
              <p><span className="font-semibold">Notes:</span> {booking.AdditionalRequirements}</p>
              <p>
                <span className="font-semibold">Status:</span>{" "}
                <span className={`px-2 py-1 rounded text-white text-xs ${
                  booking.Status === "accepted"
                    ? "bg-green-500"
                    : booking.Status === "declined"
                    ? "bg-red-500"
                    : "bg-yellow-500"
                }`}>
                  {booking.Status || "pending"}
                </span>
              </p>
            </div>

            <div className="flex gap-4 mt-4">
              <button
                onClick={() => handleStatusUpdate(booking._id, "accepted")}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                disabled={booking.Status === "accepted"}
              >
                Accept
              </button>
              <button
                onClick={() => handleStatusUpdate(booking._id, "declined")}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                disabled={booking.Status === "declined"}
              >
                Decline
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;