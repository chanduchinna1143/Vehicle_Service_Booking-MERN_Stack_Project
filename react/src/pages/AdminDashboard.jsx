import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaTimesCircle, FaClock, FaTools } from "react-icons/fa";

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");
  const [selectedMechanics, setSelectedMechanics] = useState({});

  const mechanics = ["Mechanic 1", "Mechanic 2", "Mechanic 3", "Mechanic 4"];

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3000/bookingtoadmin", {
          headers: { Authorization: `Bearer ${token}` },
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
          setError(result.message || "Failed to fetch bookings");
        }
      } catch (err) {
        setError("Server error while fetching bookings");
      }
    };

    fetchBookings();
  }, []);

  const handleStatusUpdate = async (id, status, mechanic = "") => {
    try {
      let updatedBookings = [...bookings];
      updatedBookings = updatedBookings.map((booking) =>
        booking._id === id
          ? { ...booking, Status: status, AssignedMechanic: mechanic }
          : booking
      );
      setBookings(updatedBookings);

      const response = await fetch(`http://localhost:3000/bookings/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, mechanic }),
      });

      const result = await response.json();
      if (!response.ok) alert(result.message || "Failed to update status");
    } catch (err) {
      alert("Server error while updating booking status");
    }
  };

  const getStatusBadge = (status) => {
    const base =
      "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold";
    switch (status) {
      case "accepted":
        return (
          <span className={`${base} bg-green-100 text-green-700`}>
            <FaCheckCircle /> Accepted
          </span>
        );
      case "assigned":
      case "in-progress":
        return (
          <span className={`${base} bg-blue-100 text-blue-700`}>
            <FaTools /> Work In Progress
          </span>
        );
      case "completed":
        return (
          <span className={`${base} bg-green-200 text-green-800`}>
            <FaCheckCircle /> Completed
          </span>
        );
      case "declined":
        return (
          <span className={`${base} bg-red-100 text-red-700`}>
            <FaTimesCircle /> Declined
          </span>
        );
      default:
        return (
          <span className={`${base} bg-yellow-100 text-yellow-700`}>
            <FaClock /> Pending
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 px-6 py-10">
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12 tracking-tight">
        Admin Bookings Dashboard
      </h2>

      {error && (
        <div className="max-w-md mx-auto mb-6 bg-red-100 text-red-700 px-4 py-3 rounded shadow">
          {error}
        </div>
      )}

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500 text-lg mt-20">
          No bookings found.
        </p>
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
                  <p><span className="font-semibold">Service:</span> {booking.ServiceType}</p>
                  <p><span className="font-semibold">Vehicle No:</span> {booking.VehicleNumber}</p>
                  <p><span className="font-semibold">Date:</span> {new Date(booking.AppointmentDate).toLocaleDateString()}</p>
                  <p><span className="font-semibold">Notes:</span> {booking.AdditionalRequirements}</p>
                  {booking.AssignedMechanic && (
                    <p><span className="font-semibold">Assigned:</span> {booking.AssignedMechanic}</p>
                  )}
                </div>
                <div className="mt-4">{getStatusBadge(booking.Status)}</div>
              </div>

              <div className="flex flex-col gap-2 px-5 py-4 border-t border-gray-100 bg-gray-50">
                {booking.Status === "pending" && (
                  <>
                    <button
                      onClick={() => handleStatusUpdate(booking._id, "accepted")}
                      className="w-full px-4 py-2 rounded-lg text-white font-medium bg-green-600 hover:bg-green-700">
                      Accept
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(booking._id, "declined")}
                      className="w-full px-4 py-2 rounded-lg text-white font-medium bg-red-600 hover:bg-red-700">
                      Decline
                    </button>
                  </>
                )}

                {booking.Status === "accepted" && (
                  <>
                    <select
                      onChange={(e) =>
                        setSelectedMechanics((prev) => ({
                          ...prev,
                          [booking._id]: e.target.value,
                        }))
                      }
                      className="border border-gray-300 rounded-lg px-2 py-1 text-sm"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select Mechanic
                      </option>
                      {mechanics.map((mec) => (
                        <option key={mec} value={mec}>
                          {mec}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() =>
                        handleStatusUpdate(
                          booking._id,
                          "in-progress",
                          selectedMechanics[booking._id]
                        )
                      }
                      disabled={!selectedMechanics[booking._id]}
                      className={`w-full px-4 py-2 rounded-lg text-white font-medium ${
                        selectedMechanics[booking._id]
                          ? "bg-blue-600 hover:bg-blue-700"
                          : "bg-gray-400 cursor-not-allowed"
                      }`}
                    >
                      Assign & Start Work
                    </button>
                  </>
                )}

                {booking.Status === "in-progress" && (
                  <button
                    onClick={() => handleStatusUpdate(booking._id, "completed")}
                    className="w-full px-4 py-2 rounded-lg text-white font-medium bg-green-600 hover:bg-green-700">
                    Mark Completed
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
