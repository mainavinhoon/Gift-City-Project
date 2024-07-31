"use client"
import dynamic from 'next/dynamic';
import React from 'react';

// Dynamically import the MapComponent with SSR disabled
const Map = dynamic(() => import('./MapComponent'), {
  ssr: false
});

const Page = () => {
  return (
    <div>
      <Map />
    </div>
  );
};

export default Page;
