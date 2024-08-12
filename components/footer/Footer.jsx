import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white border-t shadow-md">
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="flex flex-col items-center md:items-start gap-4 md:w-1/4">
            <img
              src="https://www.giftgujarat.in/assets/common/vectors/logo-dark.svg"
              alt="Logo"
              className="w-24 md:w-32"
            />
            <div className="text-sm text-gray-600 text-center md:text-left">
              © 2023 GIFT City - All intellectual property rights reserved
            </div>
            <div className="mt-4">
              <div className="flex flex-wrap justify-center md:justify-start gap-2">
                <a
                  href="#"
                  className="text-blue-600 hover:underline p-2 border rounded-full"
                >
                  Twitter
                </a>
                <a
                  href="#"
                  className="text-blue-600 hover:underline p-2 border rounded-full"
                >
                  LinkedIn
                </a>
                <a
                  href="#"
                  className="text-blue-600 hover:underline p-2 border rounded-full"
                >
                  Youtube
                </a>
                <a
                  href="#"
                  className="text-blue-600 hover:underline p-2 border rounded-full"
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:gap-8 w-full">
            <div className="flex flex-col md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-lg font-semibold mb-4 text-center md:text-left">
                ABOUT
              </h2>
              <ul className="list-none text-center md:text-left space-y-2">
                <li className="flex items-center">
                  <span className="w-2.5 h-2.5 bg-blue-600 rounded-full mr-2"></span>
                  BUSINESS
                </li>
                <li className="flex items-center">
                  <span className="w-2.5 h-2.5 bg-blue-600 rounded-full mr-2"></span>
                  UPDATES
                </li>
                <li className="flex items-center">
                  <span className="w-2.5 h-2.5 bg-blue-600 rounded-full mr-2"></span>
                  CONTACT
                </li>
                <li className="flex items-center">
                  <span className="w-2.5 h-2.5 bg-blue-600 rounded-full mr-2"></span>
                  PRIVACY
                </li>
              </ul>
            </div>

            <div className="flex flex-col md:w-1/2">
              <h2 className="text-lg font-semibold mb-4 text-center md:text-left">
                DOWNLOADS
              </h2>
              <ul className="list-none text-center md:text-left space-y-2">
                <li className="flex items-center">
                  <span className="w-2.5 h-2.5 bg-blue-600 rounded-full mr-2"></span>
                  RIGHT TO INFORMATION
                </li>
                <li className="flex items-center">
                  <span className="w-2.5 h-2.5 bg-blue-600 rounded-full mr-2"></span>
                  ODAS
                </li>
                <li className="flex items-center">
                  <span className="w-2.5 h-2.5 bg-blue-600 rounded-full mr-2"></span>
                  CAREER
                </li>
                <li className="flex items-center">
                  <span className="w-2.5 h-2.5 bg-blue-600 rounded-full mr-2"></span>
                  ACCREDITATION
                </li>
                <li className="flex items-center">
                  <span className="w-2.5 h-2.5 bg-blue-600 rounded-full mr-2"></span>
                  USEFUL LINKS
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:w-1/4">
            <span className="text-lg font-semibold mb-2 text-center md:text-left">
              KEEP ME UPDATED
            </span>
            <p className="text-xs text-center md:text-left mb-4">
              I want to stay up to date with the latest developments and exciting news on how we are shaping the future!
            </p>
            <div className="border-b-2 mb-4">
              <input
                type="email"
                placeholder="your email"
                required
                className="bg-transparent border-none ring-offset-white ring-offset-0 w-full p-2"
              />
              <button className="border-none bg-transparent mt-2 w-full py-2 text-blue-600 hover:underline">
                SIGN UP
              </button>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <input
                type="checkbox"
                className="form-checkbox text-blue-600"
              />
              <span>I consent to share my information with GIFT City</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between py-5 border-t mt-4">
          <div className="text-center md:text-left md:w-1/4 text-sm">
            +91-9099700247
          </div>
          <span className="text-orange-600 font-semibold text-base text-center md:text-left md:w-1/2">
            query@giftgujarat.in | 079-61708300 | 1800 120 1300
          </span>
          <div className="md:w-1/4"></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
