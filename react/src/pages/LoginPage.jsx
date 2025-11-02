import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

function LoginPage({ setLoggedIn }) {
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (response.ok) {
        toast.success("Login successful!");
        localStorage.setItem("userEmail", result.email);
        localStorage.setItem("userRole", result.role);
        localStorage.setItem("token", result.token);
        setLoggedIn(true);

        if (result.role === "admin") {
          navigate("/toadmin");
        } else {
          const statusRes = await fetch("http://localhost:3000/userstatus", {
            headers: {
              Authorization: `Bearer ${result.token}`,
            },
          });
          const bookings = await statusRes.json();

            if (Array.isArray(bookings) && bookings.length > 0) {
              navigate("/userstatus");
            } else {
              navigate("/booking");
            }
        }
      } else {
        toast.error(result.message || "Invalid email or password");
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex h-157 bg-gray-100">
      <div className="w-2/3 relative">
        <img
          src="/project_car.webp"
          alt="Car Service"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-10 left-10 text-white">
          <h1 className="text-4xl font-bold">Car Maintenance Portal</h1>
          <p className="mt-2 text-lg text-gray-200">
            Manage your car service, repairs, and more.
          </p>
        </div>
      </div>

      <div className="w-1/3 flex flex-col justify-center items-center bg-white shadow-xl px-8 rounded-2xl h-full">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Welcome Back</h2>

        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
          <div>
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              name="email"
              type="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Password</label>
            <input
              name="password"
              type="password"
              value={data.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>

          <p className="text-center text-gray-600 mt-4">
            Don’t have an account?{" "}
            <Link to="/SignUp" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;