"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) { toast.error("All fields are required."); return; }
    if (password !== confirmPassword) { toast.error("Passwords don't match."); return; }
    if (password.length < 6) { toast.error("Password must be at least 6 characters."); return; }
    setLoading(true);
    try {
      const resUserExists = await fetch("api/existUser", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const { user } = await resUserExists.json();
      if (user) { toast.error("An account with this email already exists."); setLoading(false); return; }

      const res = await fetch("api/register", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, confirmPassword }),
      });
      await fetch("api/profile", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: username, email, location: "Write Your Location", occupation: "Write Your Occupation", bio: "Write Something About Yourself", dp: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp" }),
      });

      if (res.ok) { toast.success("Account created! Welcome to GIFT City."); router.push("/Login"); }
      else toast.error("Registration failed. Please try again.");
    } catch { toast.error("Something went wrong."); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex" style={{ background: "var(--cream)", paddingTop: "var(--navbar-height, 5.5rem)" }}>
      {/* ── Left panel ──────────────────────────────────────── */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 border-r" style={{ borderColor: "var(--rule)" }}>
        <div>
          <p className="mono-label mb-8" style={{ color: "var(--orange)" }}>
            ● GIFT CITY · IFSC PORTAL
          </p>
          <h1 className="display-xl leading-none mb-0" style={{ fontSize: "clamp(3.5rem, 7vw, 6rem)" }}>
            Join the<br />
            <span style={{ color: "var(--orange)" }}>Community.</span>
          </h1>
          <p className="mt-8 max-w-sm leading-relaxed" style={{ fontFamily: "var(--font-body)", color: "var(--ink-light)", fontSize: "1rem" }}>
            Create your free account and get access to events, community posts, and everything 
            happening at India&apos;s premier financial hub.
          </p>
          <div className="mt-10 space-y-4">
            {[
              "Discover & RSVP to community events",
              "Connect with 40K+ professionals",
              "Explore the GIFT City map",
              "Build your professional profile",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <span style={{ color: "var(--orange)", fontFamily: "var(--font-mono)", fontWeight: 700, flexShrink: 0 }}>→</span>
                <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-light)", fontSize: "0.9rem" }}>{item}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <hr className="rule mb-4" />
          <p className="mono-label" style={{ color: "var(--ink-light)" }}>Zero corporate donors. One large, stubborn community.</p>
        </div>
      </div>

      {/* ── Right form panel ──────────────────────────────────── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <p className="mono-label mb-2" style={{ color: "var(--orange)" }}>Create Account</p>
          <h2 className="display-md mb-10" style={{ fontSize: "2rem" }}>Join GIFT City.</h2>

          <form onSubmit={handleSubmit} className="space-y-7">
            <div>
              <p className="mono-label mb-2" style={{ color: "var(--ink-light)" }}>Username</p>
              <input id="signup-username" type="text" value={username} onChange={(e) => setUsername(e.target.value)}
                autoComplete="username" required placeholder="Your display name" className="input-editorial" />
            </div>
            <div>
              <p className="mono-label mb-2" style={{ color: "var(--ink-light)" }}>Email Address</p>
              <input id="signup-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                autoComplete="email" required placeholder="you@example.com" className="input-editorial" />
            </div>
            <div>
              <p className="mono-label mb-2" style={{ color: "var(--ink-light)" }}>Password</p>
              <div className="relative">
                <input id="signup-password" type={showPassword ? "text" : "password"} value={password}
                  onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" required
                  placeholder="Min. 6 characters" className="input-editorial pr-10" />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 p-2"
                  style={{ color: "var(--ink-light)" }}>
                  {showPassword ? <FaEyeSlash size={15} /> : <FaEye size={15} />}
                </button>
              </div>
            </div>
            <div>
              <p className="mono-label mb-2" style={{ color: "var(--ink-light)" }}>Confirm Password</p>
              <input id="signup-confirm-password" type={showPassword ? "text" : "password"} value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)} autoComplete="new-password" required
                placeholder="Repeat your password" className="input-editorial" />
              {password && confirmPassword && (
                <p className="mt-1.5 text-xs font-bold" style={{
                  fontFamily: "var(--font-mono)", letterSpacing: "0.08em",
                  color: password === confirmPassword ? "#1A4A2A" : "var(--orange)"
                }}>
                  {password === confirmPassword ? "✓ Passwords match" : "⚠ Passwords don't match"}
                </p>
              )}
            </div>

            <button type="submit" disabled={loading} className="btn-orange w-full">
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating account…
                </span>
              ) : "Create Account →"}
            </button>
          </form>

          <hr className="rule mt-10 mb-8" />
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--ink-light)" }}>
            Already have an account?{" "}
            <Link href="/Login" className="font-bold" style={{ color: "var(--orange)", textDecoration: "none" }}>
              Sign in →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;