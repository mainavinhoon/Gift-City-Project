"use client";
import React from 'react';
import Link from 'next/link';
import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';

const team = [
  {
    name: "Om Makwana",
    role: "Frontend Developer",
    bio: "Passionate about seamless UX. Probably perfecting pixel alignment at 2AM right now.",
    linkedin: "https://www.linkedin.com/in/om-makwana-a61063242/",
    github: "https://github.com/makwanaom",
    instagram: "https://www.instagram.com/om_makwana549/",
    color: "var(--orange)",
  },
  {
    name: "Navin Rawat",
    role: "Full Stack Developer",
    bio: "Builds robust, scalable web apps. Will debug your code and silently judge your variable names.",
    linkedin: "https://www.linkedin.com/in/navin-rawat/",
    github: "https://github.com/mainavinhoon",
    instagram: "https://www.instagram.com/mainavinhoon/",
    color: "var(--green-dark)",
  },
  {
    name: "Hardik Bhammar",
    role: "Backend & Integration",
    bio: "Expert at integrating tech. Makes the API work at 11:59 PM. Every single time.",
    linkedin: "https://www.linkedin.com/in/hardik8491",
    github: "https://github.com/Hardik8491",
    instagram: "https://www.instagram.com/hardik_8491/",
    color: "var(--ink)",
  },
];

const features = [
  { num: "01", title: "Create Events",     desc: "Add events with titles, locations, dates, and images. No more missed seminars or surprise meetups." },
  { num: "02", title: "Community Wall",    desc: "Share insights, announcements, and hot takes with 40K+ professionals who know what IFSC stands for." },
  { num: "03", title: "Interactive Map",   desc: "Navigate every landmark of India's smartest square kilometre. Every pin tells a story." },
  { num: "04", title: "Secure Auth",       desc: "Powered by NextAuth. Your password is safe. Unlike some of your financial decisions." },
  { num: "05", title: "Developer Ready",   desc: "Next.js 14, MongoDB, Cloudinary. A tech stack almost as impressive as the city itself." },
  { num: "06", title: "Your Profile",      desc: "Build your GIFT City identity. Let people know you're one of the 40K who chose to show up." },
];

export default function AboutUs() {
  return (
    <main style={{ paddingTop: "5.5rem", background: "var(--cream)" }}>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 pt-12 pb-0">
        <p className="mono-label mb-4" style={{ color: "var(--orange)" }}>🏙 About This Project</p>
        <h1 className="display-xl leading-none">
          Built for<br />
          <span style={{ color: "var(--orange)" }}>GIFT</span>{" "}
          <span className="italic" style={{ fontStyle: "italic", color: "var(--green-dark)" }}>City.</span>
        </h1>
        <div className="max-w-xl mt-8 mb-0">
          <p className="text-base leading-relaxed" style={{ fontFamily: "var(--font-body)", color: "var(--ink-light)" }}>
            A community-first platform connecting residents, professionals, and businesses 
            of India&apos;s most ambitious financial district. Events, maps, posts — one place. 
            Zero corporate sponsors. One large, stubborn community.
          </p>
        </div>

        <hr className="rule mt-12" />

        {/* Mission stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-0 divide-x" style={{ borderColor: "var(--rule)", marginBottom: "0" }}>
          {[["250+", "Global Companies"], ["40K+", "Professionals"], ["₹72K Cr", "Investment"], ["2015", "Year Founded"]].map(([v, l], i) => (
            <div key={l} className="stat-item py-8" style={i > 0 ? { paddingLeft: "2rem" } : {}}>
              <p style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(1.5rem, 3vw, 2.5rem)", color: "var(--ink)" }}>{v}</p>
              <p className="mono-label mt-1" style={{ color: "var(--ink-light)" }}>{l}</p>
            </div>
          ))}
        </div>
        <hr className="rule" />
      </section>

      {/* ── Features — Dark section ─────────────────────────── */}
      <section style={{ background: "var(--dark-bg)" }} className="py-20 px-6 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <p className="mono-label-dark mb-4">What We Offer</p>
          <h2 className="display-md mb-2" style={{ color: "var(--cream)" }}>
            The Platform.<br />
            <span style={{ color: "var(--orange)" }}>The Features.</span>
          </h2>
          <p className="mb-12 max-w-lg text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)", color: "rgba(237,232,222,0.45)" }}>
            Read it once. Read it twice. Then recommend it to someone in your building.
          </p>
          <div className="space-y-0">
            {features.map((f) => (
              <div key={f.num} className="demand-item">
                <div className="section-num">{f.num}</div>
                <div className="pt-2">
                  <h3 className="mb-2" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.25rem", color: "var(--cream)" }}>
                    {f.title}
                  </h3>
                  <p style={{ fontFamily: "var(--font-body)", color: "rgba(237,232,222,0.5)", fontSize: "0.9rem", lineHeight: 1.65 }}>
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ──────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 py-16">
        <p className="mono-label mb-4" style={{ color: "var(--orange)" }}>The Builders</p>
        <h2 className="display-md mb-2">The Team.</h2>
        <p className="text-sm mb-12" style={{ fontFamily: "var(--font-body)", color: "var(--ink-light)" }}>
          Three developers, one vision, infinite Stack Overflow tabs.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 border border-[var(--rule)]">
          {team.map((member, i) => (
            <div key={member.name}
              className="p-8 border-b sm:border-b-0 flex flex-col"
              style={{ borderRight: i < team.length - 1 ? "1px solid var(--rule)" : "none" }}
            >
              {/* Color accent bar */}
              <div className="w-12 h-1 mb-6" style={{ background: member.color }} />
              
              <h3 className="mb-0.5" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.25rem", color: "var(--ink)" }}>
                {member.name}
              </h3>
              <p className="mono-label mb-5" style={{ color: "var(--ink-light)" }}>{member.role}</p>
              <p className="text-sm leading-relaxed flex-1 mb-8" style={{ fontFamily: "var(--font-body)", color: "var(--ink-light)" }}>
                {member.bio}
              </p>
              
              {/* Social links */}
              <div className="flex items-center gap-2 pt-5 border-t" style={{ borderColor: "var(--rule)" }}>
                {[
                  { href: member.linkedin,  Icon: FaLinkedin,  label: "LinkedIn" },
                  { href: member.github,    Icon: FaGithub,    label: "GitHub" },
                  { href: member.instagram, Icon: FaInstagram, label: "Instagram" },
                ].map(({ href, Icon, label }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    className="pill pill-orange" style={{ cursor: "pointer" }}>
                    <Icon size={11} /> {label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
