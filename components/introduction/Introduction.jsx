"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

const stats = [
  { value: "250+",    label: "Global Entities",       suffix: "" },
  { value: "0",       label: "Corporate Donors",      suffix: "" },
  { value: "40K+",    label: "Professionals",         suffix: "" },
  { value: "₹72K Cr", label: "Committed Investment",  suffix: "" },
];

function Counter({ target, started }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    const num = parseInt(target.replace(/[^0-9]/g, ""), 10);
    if (!num && num !== 0) return;
    let c = 0;
    const steps = 50;
    const inc = num / steps;
    const t = setInterval(() => {
      c += inc;
      if (c >= num) { setCount(num); clearInterval(t); }
      else setCount(Math.floor(c));
    }, 1600 / steps);
    return () => clearInterval(t);
  }, [started, target]);

  const prefix = target.startsWith("₹") ? "₹" : "";
  const suffix = target.endsWith("+") ? "+" : target.endsWith("Cr") ? " Cr" : "";
  const numeric = parseInt(target.replace(/[^0-9]/g, ""), 10);
  const display = (!numeric && numeric !== 0) ? target : `${prefix}${count}${suffix}`;
  return <>{display}</>;
}

const Introduction = () => {
  const statsRef = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ background: "var(--cream)" }}>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 pt-10 pb-0">
        {/* Launch pill */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <span className="badge-editorial">
            ● Portal · Live since 2015
          </span>
        </motion.div>

        {/* Giant headline — left aligned editorial style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h1 className="display-xl leading-none mb-0">
            Gujarat<br />
            International
          </h1>
          <h1 className="display-xl leading-none mb-0" style={{ color: "var(--orange)" }}>
            Finance
          </h1>
          <h1 className="display-xl leading-none italic" style={{ color: "var(--green-dark)", fontStyle: "italic" }}>
            Tec-City.
          </h1>
        </motion.div>

        {/* Sub copy */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-8 mb-10 max-w-lg"
        >
          <p style={{ fontFamily: "var(--font-body)", fontSize: "1.05rem", color: "var(--ink-light)", lineHeight: 1.6 }}>
            India&apos;s first operational smart city and International Financial Services Centre.
            Where global finance actually happens — not just gets talked about.
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="flex flex-wrap items-center gap-5 mb-16"
        >
          <Link href="/#Events" className="btn-orange">
            Explore Events <FaArrowRight size={12} />
          </Link>
          <Link href="/Community" className="btn-ghost"
            style={{ borderColor: "var(--ink)", color: "var(--ink)" }}>
            Read the Community →
          </Link>
        </motion.div>

        <hr className="rule" />

        {/* ── Stats Bar ───────────────────────────────────────── */}
        <div ref={statsRef} className="grid grid-cols-2 sm:grid-cols-4 divide-x" style={{ borderColor: "var(--rule)" }}>
          {stats.map((s, i) => (
            <div key={s.label} className="stat-item px-0 sm:px-6 py-8" style={i === 0 ? { paddingLeft: 0 } : {}}>
              <p className="display-md leading-none mb-1">
                <Counter target={s.value} started={started} />
              </p>
              <p className="mono-label" style={{ color: "var(--ink-light)", fontFamily: "var(--font-mono)" }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>

        <hr className="rule" />

        {/* ── Find us on ──────────────────────────────────────── */}
        <div className="py-8">
          <p className="mono-label mb-4">Connect With the Community</p>
          <div className="flex flex-wrap gap-2">
            {[
              "LinkedIn · GIFT City",
              "Twitter · @GIFTCity",
              "YouTube · GIFT City",
              "Instagram · @GIFTCity",
              "Telegram Channel",
            ].map((s) => (
              <span key={s} className="pill">{s}</span>
            ))}
          </div>
        </div>

        <hr className="rule" />
      </section>

      {/* ── Dark Manifesto Section ─────────────────────────────── */}
      <section style={{ background: "var(--dark-bg)" }} className="py-24 px-6 sm:px-8 mt-0">
        <div className="max-w-7xl mx-auto">
          <p className="mono-label-dark mb-4">The Vision</p>
          <h2 className="display-lg mb-6" style={{ color: "var(--cream)" }}>
            The Hub. The Community.<br />
            <span style={{ color: "var(--orange)" }}>The Future.</span>
          </h2>
          <p className="max-w-2xl text-base leading-relaxed mb-12" style={{ fontFamily: "var(--font-body)", color: "rgba(237,232,222,0.6)" }}>
            GIFT City is not just a financial district — it&apos;s a living ecosystem of 250+ global companies, 
            40,000+ professionals, and a community of builders who chose ambition over comfort. 
            This portal connects them all.
          </p>

          {/* Key pillars as numbered items */}
          <div className="space-y-0">
            {[
              { num: "01", title: "Events & Networking", desc: "Discover seminars, workshops, and meetups happening across GIFT City. Create events, RSVP, and show up." },
              { num: "02", title: "Community Wall",      desc: "Share insights, ask questions, and engage with professionals who actually know what IFSC stands for." },
              { num: "03", title: "Interactive Map",     desc: "Navigate the world-class infrastructure of India's smartest square kilometre. Every landmark, pinned." },
              { num: "04", title: "Your Profile",        desc: "Build your GIFT City identity. Let people know you're one of the 40,000+ who chose to be here." },
            ].map((item) => (
              <div key={item.num} className="demand-item">
                <div className="section-num">{item.num}</div>
                <div className="pt-2">
                  <h3 className="mb-2" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.35rem", color: "var(--cream)" }}>
                    {item.title}
                  </h3>
                  <p style={{ fontFamily: "var(--font-body)", color: "rgba(237,232,222,0.55)", fontSize: "0.95rem", lineHeight: 1.65 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Introduction;
