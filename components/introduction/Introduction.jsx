"use client";
import React from "react";
import 'animate.css';
import Banner from "../Banner/Banner";
import Image from "next/image";

const Introduction = () => {
  return (
    <div className="animate__animated animate__fadeIn h-fit flex flex-col mt-3 z-1">
      <div className="relative z-1" style={{ paddingBottom: '56.25%' }}>
        <Image src="/bgone.jpg" alt="bg-img" fill={true} className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex items-center justify-center p-4">
          <div className="text-white text-center text-xl md:text-2xl lg:text-4xl font-semibold bg-black bg-opacity-50 p-4 rounded-lg shadow-lg">
            Gujarat International Finance Tech-City Gandhinagar<br />
            A Premier Global Financial Hub
          </div>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto mt-0 text-gray-700">
        <Banner />
      </div>
    </div>
  );
};

export default Introduction;
