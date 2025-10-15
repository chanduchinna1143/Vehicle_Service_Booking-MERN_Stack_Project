import React from 'react'

import {FaGooglePlay,FaAppStoreIos,FaFacebook,FaWhatsapp,FaInstagram,FaLinkedin,FaYoutube} from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-neutral-950 w-full text-white p-10">

        <div className="grid grid-cols-2  gap-8 mb-5">
            {/* address and motto section */}
            <div className="flex justify-between flex-wrap">
                <div className="mb-3">
                <h2 className="text-3xl font-bold mb-">Honda</h2>
                <p>Opp. Talentsprint,Gachibowli,Hyderabad,Telangana-506002</p>
                </div>

                <div className="md:text-3xl text-xl font-bold">
                    <h2>#alwaysMoveForward</h2>
                </div>
            </div>
        </div>

       
        {/* About and other sections */}
        <div className="flex  flex-wrap justify-between mb-5">
            {/* reachus section */}
            <div className="m-5">
                <h4 className="text-base font-bold">Reach Us</h4>
                <p>hello@readyassist.in</p>
                <p>875392742(readyAssist)</p>
                <p>82957937(CNGFirst)</p>
            </div>
            {/* company */}
            <div className="m-5">
                <h4 className="text-base font-bold">Company</h4>
                <p>About us</p>
                <p>career</p>
                <p>contact us</p>
                <p>News</p>
            </div>
            {/* products */}
            <div className="m-5">
                <h4 className="text-base font-bold">Products</h4>
                <p>Dashcom</p>
                <p>seat covers</p>
                <p>mac+</p>
                <p>claims pro</p>
            </div>
            {/* resources */}
            <div className="m-5">
                <h4 className="text-base font-bold">Resources</h4>
                <p>Blogs</p>
                <p>Spotlight videos</p>
                <p>Flood safety</p>
                <p>CNG Market insights</p>
            </div>
            {/* quicklinks */}
            <div className="m-5 text-center">
                <h4 className="text-base font-bold">QuickLinks</h4>
                <p>MySubcriptions</p>
                <p>CNG Fuel Statics</p>
                <p>Year Recap</p>
                <p>Prime Terms & Conditions</p>
            </div>
        </div>

        <div className="flex flex-wrap  justify-between">
            <div className="flex p-3 gap-9 text-5xl mb-4">
                <FaGooglePlay className="hover:text-green-400 cursor-pointer" />
                <FaAppStoreIos className="hover:text-blue-400 cursor-pointer" />
            </div>
            <div className="flex p-3 gap-7 text-3xl mb-4">
                <FaFacebook className="hover:text-blue-500 cursor-pointer" />
                <FaWhatsapp className="hover:text-green-500 cursor-pointer" />
                <FaInstagram className="hover:text-pink-500 cursor-pointer" />
                <FaLinkedin className="hover:text-blue-400 cursor-pointer" />
                <FaYoutube className="hover:text-red-500 cursor-pointer" />
            </div>

        </div>

        <div className="flex justify-between flex-wrap">
            <p className='hover:text-blue-400 cursor-pointer'> &copy; 2025 vehicle service booking private limited.All rights reserved.</p>
            <div className="flex justify-betweeen gap-4">
            <p className="hover:text-blue-400 cursor-pointer">PrivacyPolicy</p>
            <p className="hover:text-blue-400 cursor-pointer">Terms&Conditions</p>
            </div>

        </div>

    </div>
  )
}

export default Footer
