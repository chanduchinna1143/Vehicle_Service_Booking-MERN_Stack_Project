// import React from 'react'
// import { useEffect } from 'react';
// import { useState } from 'react'

// const AdminDashboard = () => {
//   const [bookings, setBookings] = useState([]);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchBookings = async()=>{
//       try {
//         const response = await fetch("http://localhost:3000/bookingtoadmin");
//         const result = await response.json();
//         if (response.ok) {
//           setBookings(result);
//         } else {
//           setError(result.message );
//         }
//       } catch (err) {
//         setError("Server error");
//       }
//     };

//     fetchBookings();
//   }, []);

//   return(
//     <div className='px-8 py-4 space-y-8' >
//       <section>
//         <h2 className='text-3xl font-semibold text-center'>Appointments Requets</h2>
//       </section>
//       <section className=' grid grid-cols-4 gap-x-8 gap-y-8 '>
//         {bookings.map((booking, index) => (
//           <div className='rounded-2xl h-auto border border-black shadow-xl inset-shadow-sm flex flex-col  p-4 justify-between space-y-4'key={index}>
//             <img src="sbp.jpg" alt="click" className='rounded-4xl  w=10 h-30' />
//             <p><strong>Name:</strong> {booking.FullName}</p>
//             <p><strong>Mobile:</strong> {booking.MobileNumber}</p>
//             <p><strong>Car Model:</strong> {booking.CarModel}</p>
//             <p><strong>Engine:</strong> {booking.EngineType}</p>
//             <p><strong>Service:</strong> {booking.ServiceType}</p>
//             <p><strong>Vehicle No:</strong> {booking.VehicleNumber}</p>
//             <p><strong>Date:</strong> {booking.AppointmentDate}</p>
//             <p><strong>Notes:</strong> {booking.AdditionalRequirements}</p>
//           </div>
//         ))}
//       </section>
//     </div>


//   )
// }


// export default AdminDashboard



// import React from 'react'
// import { useEffect } from 'react';
// import { useState } from 'react'

// const AdminDashboard = () => {
//   const [bookings, setBookings] = useState([]);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const response = await fetch("http://localhost:3000/bookingtoadmin");
//         const result = await response.json();
//         if (response.ok) {
//           // Sort the array to show the newest items first
//           const sortedBookings = result.sort((a, b) => {
//             // This assumes your data has a timestamp field like 'createdAt'.
//             // Replace 'createdAt' with the actual name of your date field.
//             return new Date(b.createdAt) - new Date(a.createdAt);
//           });
//           setBookings(sortedBookings);
//         } else {
//           setError(result.message);
//         }
//       } catch (err) {
//         setError("Server error");
//       }
//     };

//     fetchBookings();
//   }, []); // The empty dependency array ensures this runs only once when the component mounts

//   return (
//     <div className='px-8 py-4 space-y-8' >
//       <section>
//         <h2 className='text-3xl font-semibold text-center'>Appointments Requests</h2>
//       </section>
//       <section className=' grid grid-cols-4 gap-x-8 gap-y-8 '>
//         {bookings.map((booking) => (
//           <div className='rounded-2xl h-auto border border-black shadow-xl inset-shadow-sm flex flex-col p-4 justify-between space-y-4' key={booking._id}> {/* It's better to use a unique ID from the data for the key */}
//             <img src="sbp.jpg" alt="click" className='rounded-xl w-full h-32 object-cover' /> {/* Corrected some Tailwind classes for the image */}
//             <p><strong>Name:</strong> {booking.FullName}</p>
//             <p><strong>Mobile:</strong> {booking.MobileNumber}</p>
//             <p><strong>Car Model:</strong> {booking.CarModel}</p>
//             <p><strong>Engine:</strong> {booking.EngineType}</p>
//             <p><strong>Service:</strong> {booking.ServiceType}</p>
//             <p><strong>Vehicle No:</strong> {booking.VehicleNumber}</p>
//             <p><strong>Date:</strong> {new Date(booking.AppointmentDate).toLocaleDateString()}</p> {/* Formatting the date for readability */}
//             <p><strong>Notes:</strong> {booking.AdditionalRequirements}</p>
//           </div>
//         ))}
//       </section>
//     </div>
//   )
// }

// export default AdminDashboard
import React from 'react'
import { useEffect, useState } from 'react';

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("http://localhost:3000/bookingtoadmin");
        const result = await response.json();
        if (response.ok) {
          const sortedBookings = result.sort((a, b) => b._id.localeCompare(a._id));
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
            </div>

            <div className="mt-6 flex justify-between">
              <button
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition"
              >
                Accept
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition"
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