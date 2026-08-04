"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";

const menus = [
  { label: "Home",      href: "/" },
  { label: "About Us",  href: "/AboutUs" },
  { label: "Events",    href: "/#Events" },
  { label: "Community", href: "/Community" },
  { label: "Map",       href: "/#Map" },
];

const Navbar = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [isMobileOpen, setMobileOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target))
        setProfileOpen(false);
    };
    if (isProfileOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isProfileOpen]);

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href.split("#")[0]) && href.split("#")[0] !== "/";
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b"
      style={{ background: "var(--cream)", borderColor: "var(--rule)" }}>

      {/* Top info strip */}
      <div className="border-b text-center py-1.5 overflow-hidden" style={{ borderColor: "var(--rule)", background: "var(--dark-bg)" }}>
        <div className="animate-ticker inline-flex gap-16 whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <span key={i} className="inline-flex items-center gap-10 font-mono text-[10px] tracking-widest" style={{ color: "rgba(237,232,222,0.5)", fontFamily: "var(--font-mono)" }}>
              <span>GIFT CITY · IFSC · GANDHINAGAR, GUJARAT</span>
              <span style={{ color: "var(--orange)" }}>✦</span>
              <span>EST. 2015 · INDIA&apos;S FIRST SMART CITY</span>
              <span style={{ color: "var(--orange)" }}>✦</span>
              <span>250+ GLOBAL ENTITIES · 40K+ PROFESSIONALS</span>
              <span style={{ color: "var(--orange)" }}>✦</span>
              <span>₹72,000 CR COMMITTED INVESTMENT</span>
              <span style={{ color: "var(--orange)" }}>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Main navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex items-center h-16 gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <img
              src="https://www.giftgujarat.in/assets/common/vectors/logo-dark.svg"
              width={34}
              height={34}
              alt="GIFT City"
            />
            <div className="flex flex-col leading-none">
              <span className="font-extrabold text-sm tracking-tight" style={{ fontFamily: "var(--font-body)", color: "var(--ink)" }}>
                GIFT CITY
              </span>
              <span className="text-[9px] tracking-widest uppercase" style={{ fontFamily: "var(--font-mono)", color: "var(--orange)" }}>
                EST. 2015
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-0 ml-auto">
            {menus.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="relative px-4 py-1.5 transition-all duration-150"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: isActive(item.href) ? "var(--orange)" : "var(--ink)",
                  borderBottom: isActive(item.href) ? "2px solid var(--orange)" : "2px solid transparent",
                  paddingBottom: "6px",
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Auth */}
          <div className="flex items-center gap-3 ml-4 md:ml-0" ref={profileRef}>
            {session ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 btn-ghost"
                  style={{ padding: "0.45rem 1rem" }}
                >
                  <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black" style={{ background: "var(--orange)", color: "var(--cream)", fontFamily: "var(--font-mono)" }}>
                    {(session.user?.name?.[0] || session.user?.email?.[0] || "U").toUpperCase()}
                  </span>
                  <FaChevronDown size={10} style={{ color: "var(--ink-light)" }} />
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-52"
                      style={{ background: "var(--cream)", border: "1.5px solid var(--ink)", boxShadow: "4px 4px 0 var(--orange)", zIndex: 100 }}
                    >
                      <div className="p-3 border-b" style={{ borderColor: "var(--rule)" }}>
                        <p className="mono-label mb-0.5">Signed in</p>
                        <p className="text-xs truncate" style={{ color: "var(--ink-light)", fontFamily: "var(--font-body)" }}>
                          {session.user?.email}
                        </p>
                      </div>
                      <div className="p-1.5 space-y-0.5">
                        <Link href="/Profile" onClick={() => setProfileOpen(false)}
                          className="block px-3 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors hover:bg-orange-50"
                          style={{ fontFamily: "var(--font-mono)", color: "var(--ink)", letterSpacing: "0.1em" }}>
                          My Profile
                        </Link>
                        <button onClick={() => { setProfileOpen(false); signOut({ callbackUrl: "/" }); }}
                          className="block w-full text-left px-3 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors"
                          style={{ fontFamily: "var(--font-mono)", color: "var(--orange)", letterSpacing: "0.1em" }}>
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link href="/Login" className="btn-ink" style={{ padding: "0.5rem 1.25rem" }}>
                Sign In →
              </Link>
            )}

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen(!isMobileOpen)}
              className="md:hidden p-2 transition-colors"
              style={{ color: "var(--ink)" }}
            >
              {isMobileOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden border-t"
            style={{ background: "var(--cream)", borderColor: "var(--rule)" }}
          >
            <div className="px-6 py-4 space-y-0">
              {menus.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-3 border-b text-xs font-bold uppercase tracking-wider transition-colors"
                  style={{
                    fontFamily: "var(--font-mono)",
                    borderColor: "var(--rule)",
                    color: isActive(item.href) ? "var(--orange)" : "var(--ink)",
                    letterSpacing: "0.15em",
                  }}
                >
                  {item.label}
                </Link>
              ))}
              {!session && (
                <Link href="/Login" onClick={() => setMobileOpen(false)}
                  className="btn-orange inline-flex mt-4" style={{ fontSize: "0.7rem" }}>
                  Sign In →
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
