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
            headers: { Authorization: `Bearer ${result.token}` },
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
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center relative"
      style={{
        backgroundImage:'url("https://img.freepik.com/premium-photo/auto-repair-maintenance-garage-render-3d_10221-16070.jpg")'}}>
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 transition-transform hover:scale-[1.02]">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-blue-600 drop-shadow-md">
            Honda Service Portal
          </h1>
          <p className="text-gray-600 text-sm mt-2">
            Sign in to manage your car bookings and maintenance.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Email</label>
            <input
              name="email"
              type="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">Password</label>
            <input
              name="password"
              type="password"
              value={data.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-700 text-sm mt-6">
          Don’t have an account?{" "}
          <Link to="/SignUp" className="text-blue-600 font-medium hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
