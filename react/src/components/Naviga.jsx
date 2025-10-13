import React from 'react'

import {Link} from 'react-router'

function Naviga() {
  return (
    <div className='text-3xl flex justify-between p-5 bg-amber-300'>
         <h1 className='font-bold text-4xl'>HONDA</h1>
      <nav className='space-x-10 text-2xl'>
        <Link to="/">Home</Link>
        <Link to="/About">About</Link>
        <Link to="/services">Services</Link>
        <Link to="/Login" className='bg-stone-900 text-white rounded-xl py-2 px-4 text-lg'>LOGIN</Link>
      </nav>
      
    </div>
  )
}

export default Naviga
