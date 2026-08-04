"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaTwitter, FaLinkedin, FaYoutube, FaInstagram } from "react-icons/fa";
import { toast } from "react-hot-toast";

const links = {
  "The Portal": [
    { label: "Home",       href: "/" },
    { label: "Events",     href: "/#Events" },
    { label: "Community",  href: "/Community" },
    { label: "Map",        href: "/#Map" },
  ],
  "About": [
    { label: "About Us",        href: "/AboutUs" },
    { label: "GIFT City Overview", href: "#" },
    { label: "IFSC Banking",    href: "#" },
    { label: "Capital Markets", href: "#" },
  ],
  "Resources": [
    { label: "Right to Info",   href: "#" },
    { label: "Annual Reports",  href: "#" },
    { label: "ODAS Portal",     href: "#" },
    { label: "Useful Links",    href: "#" },
  ],
};

const social = [
  { Icon: FaTwitter,   label: "@GIFTCity",      href: "#" },
  { Icon: FaLinkedin,  label: "LinkedIn",        href: "#" },
  { Icon: FaYoutube,   label: "YouTube",         href: "#" },
  { Icon: FaInstagram, label: "@GIFTCity_IFSC",  href: "#" },
];

const Footer = () => {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) { toast.error("Enter your email."); return; }
    if (!consent) { toast.error("Please accept the consent checkbox."); return; }
    toast.success("Subscribed! Welcome to the loop.");
    setEmail(""); setConsent(false);
  };

  return (
    <footer style={{ background: "var(--dark-bg)", borderTop: "1px solid var(--orange)" }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-16 pb-8">
        {/* Top row */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8 pb-12 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          {/* Brand */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <p className="font-extrabold text-lg tracking-tight mb-0.5" style={{ fontFamily: "var(--font-body)", color: "var(--cream)" }}>
                GIFT CITY
              </p>
              <p className="mono-label-dark" style={{ color: "var(--orange)" }}>IFSC COMMUNITY PORTAL · EST. 2015</p>
            </div>
            <p className="text-sm leading-relaxed max-w-xs" style={{ fontFamily: "var(--font-body)", color: "rgba(237,232,222,0.45)" }}>
              India&apos;s first operational smart city.{" "}
              <em style={{ color: "rgba(237,232,222,0.6)" }}>Headquartered where the wifi actually works.</em>
            </p>
            {/* Social handles */}
            <div>
              <p className="mono-label-dark mb-3" style={{ color: "rgba(237,232,222,0.35)" }}>Find us on</p>
              <div className="flex flex-wrap gap-2">
                {social.map(({ Icon, label, href }) => (
                  <a key={label} href={href}
                    className="pill-orange flex items-center gap-2"
                    style={{ border: "1px solid rgba(181,64,26,0.4)", color: "rgba(237,232,222,0.6)", padding: "0.3rem 0.75rem", borderRadius: 999, fontFamily: "var(--font-mono)", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.05em", textDecoration: "none", transition: "all 0.2s", display: "inline-flex" }}>
                    <Icon size={11} />
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-2 grid grid-cols-3 gap-8">
            {Object.entries(links).map(([heading, items]) => (
              <div key={heading}>
                <p className="mono-label-dark mb-4" style={{ color: "var(--orange)" }}>{heading}</p>
                <ul className="space-y-2.5">
                  {items.map((item) => (
                    <li key={item.label}>
                      <Link href={item.href}
                        className="text-sm transition-colors"
                        style={{ fontFamily: "var(--font-body)", color: "rgba(237,232,222,0.45)", textDecoration: "none" }}
                        onMouseEnter={(e) => e.target.style.color = "var(--cream)"}
                        onMouseLeave={(e) => e.target.style.color = "rgba(237,232,222,0.45)"}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-1">
            <p className="mono-label-dark mb-2" style={{ color: "var(--orange)" }}>Stay Updated</p>
            <p className="text-xs mb-4" style={{ fontFamily: "var(--font-body)", color: "rgba(237,232,222,0.4)", lineHeight: 1.6 }}>
              Events, announcements, and occasional smart-city flexes.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com" className="input-editorial-dark w-full text-sm" />
              <div className="flex items-start gap-2">
                <input type="checkbox" id="footer-consent" checked={consent} onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5" style={{ accentColor: "var(--orange)" }} />
                <label htmlFor="footer-consent" className="text-xs cursor-pointer" style={{ fontFamily: "var(--font-body)", color: "rgba(237,232,222,0.35)", lineHeight: 1.5 }}>
                  I consent to share my info with GIFT City.
                </label>
              </div>
              <button type="submit" className="btn-orange w-full" style={{ fontSize: "0.7rem", padding: "0.75rem 1rem" }}>
                Subscribe →
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="mono-label-dark" style={{ color: "rgba(237,232,222,0.25)", fontSize: "0.6rem" }}>
            © {new Date().getFullYear()} GIFT CITY · ALL RIGHTS RESERVED.
          </p>
          <p className="mono-label-dark" style={{ color: "rgba(237,232,222,0.2)", fontSize: "0.6rem" }}>
            GANDHINAGAR, GUJARAT, INDIA 🇮🇳
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
