import React from 'react'

import {Link} from 'react-router-dom'

function Naviga({ loggedIn, handleLogout }) {
  return (
    <div className='text-3xl flex justify-between items-center p-5 bg-neutral-900'>
      <div className='flex items-center space-x-4'>
        <img src="H.png" alt="Brand" className='w-20 h-10'/>
        <h1 className='font-bold text-4xl text-gray-300'>HONDA</h1>
      </div>
      <nav className='space-x-10 text-2xl text-gray-300'>
        <Link to="/">Home</Link>
        <Link to="/zero">About</Link>
        <Link to="/services">Services</Link>
        {loggedIn ? (
          <Link to="/" onClick={handleLogout} className="bg-red-500 text-white font-semibold rounded-xl py-2 px-4 text-lg">
          Logout</Link>
        ) : (
          <Link to="/login" className='bg-amber-300 text-black font-semibold rounded-xl py-2 px-4 text-lg'>
            Login
          </Link>
        )}
      </nav>
    </div>
  );
}

export default Naviga
