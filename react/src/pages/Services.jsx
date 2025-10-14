import React from 'react';

const sec = [
  {
    image : '/general.jpg',
    title: "General Service",
    description: "Routine maintenance including oil change, filter replacement and inspection",
  },
  {
    image : '/enginerepair.jpg',
    title: "Engine Repair",
    description: "Diagnostics and repair for engine-related issues",
  },
  {
    image : '/battery.jpg',
    title: "Battery Jumpstart",
    description: "On-site battery boost for dead or low batteries",
  },
  {
    image : '/tyre.jpg',
    title: "Flat Tyre Repair",
    description: "Quick fix or replacement of punctured tyres",
  },
  {
    image : '/towing.jpg',
    title: "Towing Service",
    description: "Emergency towing to nearest service center",
  },
  {
    image : '/brake.jpg',
    title: "Brake Service",
    description: "Brake pad replacement and system check",
  },
  {
    image : '/AC.jpg',
    title: "AC Repair",
    description: "Cooling system diagnostics and gas refill",
  },
  {
    image : '/Suspension.png',
    title: "Suspension Repair",
    description: "Inspect and fix shocks, struts, and suspension components",
  },
  {
    image : '/oilchange.jpg',
    title: "Oil Change",
    description: "Replace engine oil and oil filter for smoother performance",
  },
  {
    image : '/lights.jpg',
    title: "Indicators & Lights Repair",
    description: "Fix or replace faulty lights and indicators",
  },
  {
    image : '/wiper.jpg',
    title: "Windsheild Wiper Replacement",
    description: "Install new wipers for better visibility during rain",
  },
  {
    image : '/wheelalignment.png',
    title: "Wheel Alignment",
    description: "Adjust wheel angles to reduce tire wear and improve handling",
  },
  {
    image : '/coolant.jpg',
    title: "Coolant Top-Up",
    description: "Refill or replace coolant to prevent engine overheating",
  },
  {
    image : '/gearbox.jpg',
    title: "Clutch & Gearbox",
    description: "Routine maintenance including oil change, filter replace",
  },
  {
    image : '/interior.jpg',
    title: "Interior Cleaning",
    description: "Deep clean seats, dashboards, and cabin surfaces.",
  },
  {
    image : '/Exterior.jpg',
    title: "Exterior Wash & Polish",
    description: "Full body wash with polish for shine and protection",
  }
];

function Services() {
  return (
    <div className='px-8 py-4 space-y-8' >
      <section>
        <h2 className='text-3xl font-semibold text-center'>Our Services</h2>
      </section>
      <section className=' grid grid-cols-4 gap-x-8 gap-y-8 '>
        {sec.map((item, index) => (
          <div className='rounded-2xl h-auto border border-black shadow-xl inset-shadow-sm flex flex-col items-center p-4 justify-between space-y-4'key={index}>
             <img src={item.image} alt="click" className='rounded-4xl h-50'/>
            <h3 className='font-bold text-2xl text-center'>{item.title}</h3>
            <p className='text-center'>-&gt;{item.description}</p>
           <button className='bg-amber-300 text-black px-4 py-2 rounded hover:bg-amber-400'>Book Now</button>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Services;