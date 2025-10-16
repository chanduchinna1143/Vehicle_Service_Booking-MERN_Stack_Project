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
import { useEffect } from 'react';
import { useState } from 'react'

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("http://localhost:3000/bookingtoadmin");
        const result = await response.json();
        if (response.ok) {
          const sortedBookings = result.sort((a, b) => {
            return b._id.localeCompare(a._id);
          });
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
    <div className='px-8 py-4 space-y-8' >
      <section>
        <h2 className='text-3xl font-semibold text-center'>Appointments Requests</h2>
      </section>
      <section className=' grid grid-cols-4 gap-x-8 gap-y-8 '>
        {bookings.map((booking) => (
          <div className='rounded-2xl h-auto border border-black shadow-xl inset-shadow-sm flex flex-col p-4 justify-between space-y-4' key={booking._id}>
            <img src="sbp.jpg" alt="click" className='rounded-xl w-full h-32 object-cover' />
            <p><strong>Name:</strong> {booking.FullName}</p>
            <p><strong>Mobile:</strong> {booking.MobileNumber}</p>
            <p><strong>Car Model:</strong> {booking.CarModel}</p>
            <p><strong>Engine:</strong> {booking.EngineType}</p>
            <p><strong>Service:</strong> {booking.ServiceType}</p>
            <p><strong>Vehicle No:</strong> {booking.VehicleNumber}</p>
            <p><strong>Date:</strong> {new Date(booking.AppointmentDate).toLocaleDateString()}</p>
            <p><strong>Notes:</strong> {booking.AdditionalRequirements}</p>
          </div>
        ))}
      </section>
    </div>
  )
}

export default AdminDashboard