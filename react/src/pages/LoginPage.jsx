import React, { useState } from "react";
import { Link, useNavigate } from "react-router";

function LoginPage({ setLoggedIn }) {
   const [data, setData] = useState({ email: "", password: "" });
   const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/login", {method: "POST",headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      if (response.ok) {
        alert("Login successful!");
        setLoggedIn(true);
        if (result.role === "admin") {
          navigate("/toadmin");
        } else {
          navigate("/booking");
        }
      }
       else {
        alert(result.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Side - Image */}
      <div className="w-2/3 relative">
        <img
          src="/project_car.webp"
          alt="Car Service"
          className="w-full h-163 object-cover"
        />

        {/* Optional overlay text */}
        <div className="absolute top-10 left-10 text-white">
          <h1 className="text-4xl font-bold">Car Maintenance Portal</h1>
          <p className="mt-2 text-lg text-gray-200">
            Manage your car service, repairs, and more.
          </p>
        </div>
      </div>

      {/* Right Side - Login/Signup Section */}
      <div className="w-1/3 flex flex-col justify-center items-center bg-white shadow-xl px-8 rounded-4xl h-163">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Welcome Back</h2>

        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
          <div>
            <label className="block text-gray-600 mb-1">Email</label>
            <input name="email" type="email" value={data.email} onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Password</label>
            <input name="password" type="password" value={data.password} onChange={handleChange}
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
            />
          </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">Login
          </button>

          <p className="text-center text-gray-600 mt-4">
            Don’t have an account?{" "}
            <a href="/SignUp" className="text-blue-600 hover:underline">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
