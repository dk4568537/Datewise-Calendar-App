"use client";
import React, { useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter("");
  const [SignData, setSignData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignData({
      ...SignData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/login/",
        SignData
      );
      console.log("Login Data:", response.data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", response.data.user);
      setSignData({
        email: "",
        password: "",
      });
      router.push("/");
    } catch (err) {
      console.error("Error logging in:", err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="container max-w-xl mx-auto p-8 ">
        <div className="flex flex-col items-center space-y-4">
          <h1 className="text-5xl font-serif text-[#161346] font-bold">
            Calendar
          </h1>
          <h2 className="text-3xl font-serif text-[#ff7f00] font-bold">
            Login Your Account
          </h2>
        </div>
        <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3">
            <label htmlFor="email" className="text-[#161346] font-semibold">
              EMAIL
            </label>
            <input
              id="email"
              className="p-4 bg-gray-300 border rounded-lg w-full"
              type="text"
              name="email"
              placeholder="Email"
              value={SignData.email}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="password" className="text-[#161346] font-semibold">
              PASSWORD
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              value={SignData.password}
              onChange={handleChange}
              className="p-4 bg-gray-300 border rounded-lg w-full"
            />
          </div>
          <div className="flex justify-center items-center">
            <button
              className="flex items-center justify-center gap-x-3 border-2 border-[#161346] rounded-full hover:text-[#161346] hover:bg-gray-50 bg-[#161346] py-4 px-10 text-white"
              type="submit"
            >
              Submit
              <FaArrowRightLong />
            </button>
          </div>
          <div className=" text-center">
            <Link href="/component/register">
              <h3 className=" font-semibold text-orange-500 text-lg">
                Create your account!
              </h3>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
