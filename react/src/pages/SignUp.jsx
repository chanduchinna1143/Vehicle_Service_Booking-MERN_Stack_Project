import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";

const SignUp = () => {
  const [data, setData] = useState({ name: "",email: "", password: "" });
     const navigate = useNavigate();
  
    const handleChange = (e) => {
      setData({ ...data, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await fetch("http://localhost:3000/newuser", {method: "POST",headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });
  
        const result = await response.json();
        if (response.ok) {
          alert("SignUp successful!");
          navigate("/login");
        } else {
          alert(result.message || "SignUpfailed");
        }
      } catch (err) {
        console.error("SignUp error:", err);
      }
    };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left side image */}
      <div className="w-2/3 relative">
        <img
          src="/project_car.webp"
          alt="Car Service"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-10 left-10 text-white">
          <h1 className="text-4xl font-bold">Join Our Service Portal</h1>
          <p className="mt-2 text-lg text-gray-200">
            Sign up and manage your car maintenance effortlessly.
          </p>
        </div>
      </div>

      {/* Right side signup form */}
      <div className="w-1/3 flex flex-col justify-center items-center bg-white shadow-xl px-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Create Account</h2>

        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
          <div>
            <label className="block text-gray-600 mb-1">Full Name</label>
            <input
              name="name"
              type="text"
              value={data.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              name="email"
              type="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Password</label>
            <input
              name="password"
              type="password"
              value={data.password}
              onChange={handleChange}
              placeholder="Create a password"
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            Sign Up
          </button>

          <p className="text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
