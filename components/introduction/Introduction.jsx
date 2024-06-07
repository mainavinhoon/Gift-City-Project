"use client"
import React from "react";
import 'animate.css';
import Banner from "../Banner/Banner";
import Image from "next/image";
// import NextNProgress from 'nextjs-progressbar';
// import dynamic from 'next/dynamic';

// const NextNProgress = dynamic(
//   () => import('nextjs-progressbar'),
//   { ssr: false }
// );

const Introduction = () => {
  return (
    <div className=" animate__animated animate__fadeIn h-fit flex flex-col mt-3 z-1">
      
   
      <div className="relative z-1" style={{ paddingBottom: '56.25%' }}>
        <Image  src="/bgNew.png" alt="bg-img" fill={true} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl">
          Gujarat International Finance tech-city Gandhinagar <br />
          A Global Financial Hub
        </div>
      </div>
     


      <div className=" max-w-screen-2xl mx-auto mt-0 text-gray-700 ">


        <Banner />
      </div>
     



    </div>
  );
};

export default Introduction;
