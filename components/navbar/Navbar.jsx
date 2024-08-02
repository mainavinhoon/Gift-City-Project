"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { FaBars, FaUser } from "react-icons/fa";
import { useSession } from "next-auth/react";
import UserInfo from "../UserData/UserInfo";

const Navbar = () => {
  const menus = [
    { label: "Home", value: "/" },
    { label: "About Us", value: "/AboutUs" },
    { label: "Events", value: "/#Events" },
    { label: "Community", value: "/Community" },
    { label: "Maps", value: "/#Map" },
  ];

  const { data: session } = useSession();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currTab, setCurrTab] = useState("Home");
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);

  const toggleLoginStatus = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!isProfileMenuOpen);
  };

  const handleOutsideClick = (e) => {
    if (profileMenuRef.current && !profileMenuRef.current.contains(e.target)) {
      setProfileMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isProfileMenuOpen) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isProfileMenuOpen]);

  const handleProfileClick = () => {
    window.location.href = "/Profile";
  };

  return (
    <nav className="flex w-full sticky top-0 bg-white z-10 py-4 px-6 items-center ">
      <div className="bg">
        <img
          src="https://www.giftgujarat.in/assets/common/vectors/logo-dark.svg"
          width={50}
          height={50}
          alt="Logo"
        />
      </div>
      {/* Mobile menu button */}
      <div className=" flex justify-evenly ml-auto items-center md:hidden">
        <button
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          className="text-gray-600  focus:outline-none"
        >
          <FaBars  />
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
            onClick={() => setCurrTab(item.label)}
          >
            {item.label}
          </Link>
        ))}
      </div>
      {/* Mobile menu */}
      <div
        className={`ml-auto sm:hidden ${isMobileMenuOpen ? "block" : "hidden"}`}
      >
        <div className="absolute top-16 right-0 left-0 bg-white p-4 border-b-2 border-gray-600">
          {menus.map((item, index) => (
            <Link
              href={item.value}
              key={index}
              className="block py-2 text-gray-600"
              onClick={() => {
                setMobileMenuOpen(false);
                setCurrTab(item.label);
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="ml-4 relative font-medium text-xl px-6 text-black">
        {session ? (
          <button
            onClick={toggleProfileMenu}
            className="border p-2 rounded-full"
          >
            <FaUser />
          </button>
        ) : (
          <button onClick={toggleLoginStatus}>
            <Link href="/Login">Login</Link>
          </button>
        )}
        {isProfileMenuOpen && (
          <ul
            ref={profileMenuRef}
            className="bg-white w-fit flex flex-col p-4 border border-gray-300 absolute z-10 right-0 mt-2 rounded-lg shadow-lg"
          >
            <UserInfo />
            <button
              onClick={handleProfileClick}
              className=" flex justify-center items-center p-2 mx-3 rounded hover:bg-gray-200 transition duration-300 ease-in-out"
            >
              Profile
            </button>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
