"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaAppleAlt } from "react-icons/fa";
import { MdOutlineDarkMode } from "react-icons/md";
import { IoMdCalendar } from "react-icons/io";
import { SiTodoist } from "react-icons/si";
import { CgColorBucket } from "react-icons/cg";
import { TbLayoutSidebarLeftCollapseFilled } from "react-icons/tb";
import { MdOutlineSettings } from "react-icons/md";
import { IoHelpBuoySharp } from "react-icons/io5";
import { FaClapperboard } from "react-icons/fa6";

const DashboardComponent = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSynthwave, setIsSynthwave] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleProfileDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "synthwave") {
      document.body.classList.add("synthwave");
      setIsSynthwave(true);
    }
  }, []);

  const handleThemeChange = () => {
    if (isSynthwave) {
      document.body.classList.remove("synthwave");
      localStorage.setItem("theme", "default");
    } else {
      document.body.classList.add("synthwave");
      localStorage.setItem("theme", "synthwave");
    }
    setIsSynthwave(!isSynthwave);
  };

  return (
    <div className="flex h-screen">
      <div className="hidden md:flex flex-col w-72">
        <div className="flex hover:text-orange-500 items-center my-2 pl-6 h-[50px] gap-2">
          <p className="p-2 border rounded-full border-gray-800">
            <FaClapperboard />
          </p>
          <Link href="/" className="font-bold uppercase">
            Datewise
          </Link>
        </div>
        <div className="flex flex-col flex-1 overflow-y-auto">
          <nav className="flex-1 px-2 py-2">
            <input
              className="mx-4 text-gray-700 rounded-md px-4 py-2"
              type="text"
              placeholder="Search"
            />
            <div className="flex relative items-center gap-2 mt-4 py-2 px-4">
              <button
                className="focus:outline-none hover:ring-2 ring-black hover:ring-gray-200 rounded-md"
                onClick={toggleDropdown}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <Link href="/">Overview</Link>
              {isOpen && (
                <div className="absolute left-0 top-10 mt-2 w-48 bg-gray-700 text-white rounded-md shadow-lg z-10">
                  <Link
                    href="#"
                    className="block px-4 py-2 text-white hover:bg-gray-200 hover:text-black"
                  >
                    a
                  </Link>
                  <Link
                    href="#"
                    className="block px-4 py-2 text-white hover:bg-gray-100 hover:text-black"
                  >
                    b
                  </Link>
                  <Link
                    href="#"
                    className="block px-4 py-2 text-white hover:bg-gray-100 hover:text-black"
                  >
                    c
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/component/cleander/"
              className="flex items-center gap-2 px-4 py-2 mt-2 hover:text-gray-100 hover:bg-gray-700"
            >
              <IoMdCalendar className="text-2xl" />
              Calendar
            </Link>
            <Link
              href="/component/todolist"
              className="flex border-b border-black items-center gap-3 px-4 py-2 mt-2 hover:text-gray-100 hover:bg-gray-700"
            >
              <SiTodoist className="text-lg" />
              Todo List
            </Link>
            <Link
              href="/Login"
              className="flex items-center gap-3 px-4 py-2 mt-2 hover:text-gray-100 hover:bg-gray-700"
            >
              <CgColorBucket className="text-2xl" />
              Login
            </Link>

            <div className="flex items-center justify-between px-4 py-2 mt-2 hover:text-gray-100 hover:bg-gray-700">
              <div className="flex gap-2 items-center">
                <MdOutlineDarkMode className="text-2xl" />
                Dark Mode
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={isSynthwave}
                  onChange={handleThemeChange}
                />
                <span className="slider round"></span>
              </label>
            </div>
            <Link
              href="#"
              className="flex border-b border-black items-center gap-3 px-4 py-2 mt-2 hover:text-gray-100 hover:bg-gray-700"
            >
              <TbLayoutSidebarLeftCollapseFilled className="text-2xl" />
              Collapsed
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 px-4 py-2 mt-2 hover:text-gray-100 hover:bg-gray-700"
            >
              <MdOutlineSettings className="text-2xl" />
              Setting
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 px-4 py-2 mt-2 hover:text-gray-100 hover:bg-gray-700"
            >
              <IoHelpBuoySharp className="text-2xl" />
              Hepl Center
            </Link>
          </nav>
        </div>
      </div>

      <div className="flex flex-col flex-1 overflow-y-auto">
        <div className="flex items-center justify-between sticky top-0 z-50">
          <div className="w-full flex justify-between items-center rounded-full pr-2">
            <h1 className=" px-4 py-5 text-2xl font-semibold">Calendar</h1>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default DashboardComponent;
