"use client";
import React from 'react';
import Post from "@/components/community/Post";

export default function CommunityPage() {
  return (
    <main style={{ paddingTop: "5.5rem", background: "var(--cream)" }}>
      {/* Page hero */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 py-12">
        <p className="mono-label mb-4" style={{ color: "var(--orange)" }}>💬 Community Hub</p>
        <h1 className="display-xl leading-none mb-0" style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}>
          The GIFT City<br />
          <span style={{ color: "var(--orange)" }}>Community</span><br />
          <span className="italic" style={{ fontStyle: "italic", color: "var(--green-dark)" }}>Wall.</span>
        </h1>
        <p className="mt-8 max-w-xl text-base leading-relaxed" style={{ fontFamily: "var(--font-body)", color: "var(--ink-light)" }}>
          Share ideas, ask questions, and connect with professionals shaping the future of 
          Indian finance. Think LinkedIn — but with better architecture and fewer recruiters.
        </p>
        <div className="mt-8 grid grid-cols-3 gap-0 border-t" style={{ borderColor: "var(--rule)", maxWidth: "28rem" }}>
          {[["500+", "Members"], ["Daily", "New Posts"], ["Active", "Discussions"]].map(([v, l]) => (
            <div key={l} className="pt-6 pr-6">
              <p style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "1.75rem", color: "var(--ink)" }}>{v}</p>
              <p className="mono-label" style={{ color: "var(--ink-light)" }}>{l}</p>
            </div>
          ))}
        </div>
      </section>
      <Post />
    </main>
  );
}
