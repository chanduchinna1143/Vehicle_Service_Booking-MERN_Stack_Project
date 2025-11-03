import React from 'react';
import { Link } from 'react-router-dom';

function Home({ loggedIn }) {
  return (
    <div>
      <div className='flex justify-between items-center py-10 px-30'>
        <div className='space-y-18'>
          <section className='space-y-6 font-bold text-7xl'>
            <h1>24/7 Car</h1>
            <h1>Mechanic Repair</h1>
            <h1>Service</h1>
          </section>
          <section className='text-2xl text-blue-600'>
            <p>Call Us : 9966655384</p>
          </section>
          <section>
            <Link to={loggedIn ? '/booking' : '/login'}>
              <button type='button' className='bg-black text-white text-xl px-8 py-3 rounded-4xl'>
                Book Service
              </button>
            </Link>
          </section>
        </div>
        <div>
          <img src="/h1.png" alt="Click Here to Load" />
        </div>
      </div>

      <section className='space-y-6'>
        <section className='text-center space-y-6'>
          <h1 className='text-4xl font-bold'>How do we do it?</h1>
          <p className='text-stone-600'>
            Experience convenience with our bike and car minor repair service! Our skilled technicians arrive equipped with the
            necessary tools and expertise to <br />swiftly address minor issues with your vehicle on the spot, ensuring your vehicle stays in
            optimal condition for your journey ahead.
          </p>
        </section>

        <section>
          <div className='flex justify-between px-50'>
            <img src="Repair-Service-1.png" alt="click" />
            <img src="Repair-Service-2.png" alt="click" />
            <img src="Repair-Service-3.png" alt="click" />
            <img src="maintenance-tips.png" alt="click" />
            <img src="payment.png" alt="click" />
          </div>
          <div className='flex text-center gap-8 place-content-center text-stone-600'>
            <p>Diagnose the vehicle thoroughly<br /> to narrow down the problem</p>
            <p>Fix the problem with right<br /> solution for spot mobilisation</p>
            <p>Recheck the vehicle for any <br />other warning & issues</p>
            <p>Provide maintenance tips &<br /> recommendations</p>
            <p>We accept payment through<br /> online, PayTM, UPI etc</p>
          </div>
        </section>

        <section className='flex justify-center px-6 py-10'>
          <div className="grid grid-flow-col grid-rows-3 gap-x-8 gap-y-4">
            <div className="row-span-3 w-124 h-84 rounded-4xl">
              <img src="P1.jpg" alt="click" className='w-124 h-84 rounded-4xl' />
            </div>
            <div className="col-span-2">
              <h1 className='font-bold text-3xl'>Reliable On-Spot <br />Repairs with Expert Backup</h1>
            </div>
            <div className="col-span-2 row-span-2">
              <p>
                Get instant on-spot support for breakdown & starting problem issues due to<br />
                mechanical issues, electrical issues, spark plug problems, battery problems, fuse<br />
                problems, wheel problems, cable problems, air locks, fuel tappet problems, chain<br />
                link issues etc within 30 minutes for your bikes & cars from our experienced team.<br />
                If major repair is needed, we can assist through our trusted car and bike workshops.<br />
                If it can’t be fixed on-spot, we’ll recommend the next steps. We have a network of<br />
                top workshops for electrical work, tinkering, painting, and AC service under our monitoring.
              </p>
            </div>
          </div>
        </section>

        <section className='flex justify-center px-6 py-10'>
          <div className="grid grid-flow-col grid-rows-3 gap-x-8 gap-y-4">
            <div className="col-span-2">
              <h1 className='font-bold text-3xl'>Post-Breakdown Vehicle<br /> Care & Service Guidelines:</h1>
            </div>
            <div className="col-span-2 row-span-2">
              <p>
                After any breakdown repair, it’s recommended to get your vehicle checked at a<br />
                preferred workshop or authorised service centre for long-term benefit, as breakdown<br />
                fixes are typically quick solutions meant to help you mobilise from the spot. After a<br />
                jumpstart, driving the vehicle for 10–15 kilometers is advised to ensure stability. If a<br />
                major issue persists, we can provide towing or end-to-end monitoring. Service charges<br />
                vary by time: Day (6 AM to 8 PM) and Night (8 PM to 6 AM), and all spares, consumables,<br />
                and applicable taxes are charged extra. If battery issues persist, replacement is advised,<br />
                and we can help source a new battery through our partner vendors.
              </p>
            </div>
            <div className="row-span-3 w-124 h-84 rounded-4xl">
              <img src="P2.jpg" alt="click" className='w-124 h-84 rounded-4xl' />
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}

export default Home;