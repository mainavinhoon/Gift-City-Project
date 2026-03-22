import React from "react";
import { FaTwitter, FaLinkedin, FaYoutube, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <img
              src="https://www.giftgujarat.in/assets/common/vectors/logo-dark.svg"
              alt="Gift City Logo"
              className="h-14 bg-white p-2 rounded-md"
            />
            <p className="text-sm leading-6 text-slate-400">
              © {new Date().getFullYear()} GIFT City.<br />
              All intellectual property rights reserved.
            </p>
            <div className="flex space-x-5">
              <a href="#" className="text-slate-400 hover:text-white transition-colors duration-300">
                <span className="sr-only">Twitter</span>
                <FaTwitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors duration-300">
                <span className="sr-only">LinkedIn</span>
                <FaLinkedin className="h-6 w-6" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors duration-300">
                <span className="sr-only">YouTube</span>
                <FaYoutube className="h-6 w-6" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors duration-300">
                <span className="sr-only">Instagram</span>
                <FaInstagram className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white uppercase tracking-wider">About</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {['Business', 'Updates', 'Contact', 'Privacy'].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-sm leading-6 text-slate-400 hover:text-white transition-colors duration-200">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white uppercase tracking-wider">Downloads</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {['Right to Information', 'ODAS', 'Career', 'Accreditation', 'Useful Links'].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-sm leading-6 text-slate-400 hover:text-white transition-colors duration-200">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold leading-6 text-white uppercase tracking-wider">Keep Me Updated</h3>
              <p className="mt-4 text-sm leading-6 text-slate-400">
                Stay up to date with the latest developments and exciting news.
              </p>
              <form className="mt-6 sm:flex sm:max-w-md gap-x-2">
                <label htmlFor="email-address" className="sr-only">Email address</label>
                <input
                  type="email"
                  name="email-address"
                  id="email-address"
                  autoComplete="email"
                  required
                  className="w-full min-w-0 appearance-none rounded-md border-0 bg-white/5 px-3 py-2 text-base text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:w-64 sm:text-sm sm:leading-6 transition-all"
                  placeholder="Enter your email"
                />
                <button
                  type="submit"
                  className="mt-3 sm:mt-0 flex w-full items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
                >
                  Subscribe
                </button>
              </form>
              <div className="mt-4 flex items-start text-xs text-slate-400 gap-2">
                <input
                  type="checkbox"
                  className="mt-1 rounded border-slate-700 bg-slate-800 text-blue-600 focus:ring-blue-600 focus:ring-offset-slate-900"
                  id="consent"
                />
                <label htmlFor="consent" className="cursor-pointer">I consent to share my information with GIFT City.</label>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24 w-full flex flex-col md:flex-row justify-between items-center gap-4">
           <div className="text-sm text-slate-400 font-medium tracking-wide">
             <span className="text-blue-400">query@giftgujarat.in</span> | 079-61708300 | 1800 120 1300
           </div>
           <div className="text-sm text-slate-400 font-medium">
             +91-9099700247
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
