"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaBars, FaUser } from "react-icons/fa"; // Import the menu icon from react-icons/fa
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import UserInfo from "../UserData/UserInfo";

const Navbar = () => {
  
  const menus = [
    { label: "Home", value: "/" },
    { label: "About Us", value: "/AboutUs" },
    { label: "Events", value: "/#Events" },
    { label: "Community", value: "/Community" },
    { label: "Maps", value: "/#Map" },
  ];
  const {data:session}=useSession();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currTab, setCurrTab] = useState("Home");
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);

  const toggleLoginStatus = () => {
    setIsLoggedIn(!isLoggedIn);
  };
  const toggleProfileMenu = () => {
    setProfileMenuOpen(!isProfileMenuOpen);
  };



  return (
    <nav className="flex py-4 px-6 Gujarat International Finance tech-city items-center">
      <div className=' bg'>
        <img
          src="https://www.giftgujarat.in/assets/common/vectors/logo-dark.svg"
          className=""
          width={50}
          height={50}
          alt=""
        />
      </div>
      {/* Mobile menu button */}
      <div className="ml-auto block sm:hidden">
        <button
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          className="text-gray-600 focus:outline-none">
          <FaBars />
        </button>
      </div>
      {/* Desktop navigation */}
      <div className="hidden sm:flex justify-evenly text-lg font-medium gap-x-12 ml-auto">
        {menus.map((item, index) => (
          <Link
            href={item.value}
            key={index}
            className={`${
              currTab === item.label ? "border-b-2 border-gray-600" : ""
            }`}
            onClick={() => setCurrTab(item.label)}>
            {item.label}
          </Link>
        ))}
      </div>
      {/* Mobile menu */}
      <div
        className={`ml-auto sm:hidden ${
          isMobileMenuOpen ? "block" : "hidden"
        }`}>
        <div className="absolute top-16 right-0 left-0 bg-white p-4 border-b-2 border-gray-600">
          {menus.map((item, index) => (
            <Link
              href={item.value}
              key={index}
              className="block py-2  scroll-smooth text-gray-600"
              scroll 
              onClick={() => {
                setMobileMenuOpen(false);
                setCurrTab(item.label);
              }}>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="ml-4  font-medium text-xl px-6 cursor-pointer text-black">
        {session ? (
          <button onClick={toggleProfileMenu} className="border p-4 rounded-full ">
            <FaUser className="" />
          </button>
        ) : (
          <button onClick={toggleLoginStatus}>
            <Link href="/Login">Login</Link>
          </button>
        )}
        {isProfileMenuOpen && (
          <ul className="bg-white p-2 border-b-2 border-gray-600 absolute z-10 right-0 mt-2 ">
           <UserInfo/>
          </ul>
        )}


      </div>
    </nav>
  );
};

export default Navbar;
