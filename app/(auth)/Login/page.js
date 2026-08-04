"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) { toast.error("Please fill in all fields."); return; }
    setLoading(true);
    try {
      const res = await signIn("credentials", { email, password, redirect: false });
      if (res?.error) toast.error("Invalid credentials. Try again.");
      else { toast.success("Welcome back!"); router.replace("/"); }
    } catch { toast.error("Something went wrong."); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex" style={{ background: "var(--cream)", paddingTop: "var(--navbar-height, 5.5rem)" }}>
      {/* ── Left editorial panel ────────────────────────────── */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 border-r" style={{ borderColor: "var(--rule)" }}>
        <div>
          <p className="mono-label mb-8" style={{ color: "var(--orange)" }}>
            ● GIFT CITY · IFSC PORTAL
          </p>
          <h1 className="display-xl leading-none mb-0" style={{ fontSize: "clamp(3.5rem, 7vw, 6rem)" }}>
            Welcome<br />Back.
          </h1>
          <p className="mt-8 max-w-sm leading-relaxed" style={{ fontFamily: "var(--font-body)", color: "var(--ink-light)", fontSize: "1rem" }}>
            Sign in to access events, community posts, and everything happening at India&apos;s premier
            international financial hub.
          </p>
        </div>
        <div>
          <hr className="rule mb-6" />
          <div className="grid grid-cols-3 gap-6">
            {[["250+", "Companies"], ["40K+", "Professionals"], ["88+", "Financial Entities"]].map(([v, l]) => (
              <div key={l} className="stat-item">
                <p style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "1.75rem", color: "var(--ink)" }}>{v}</p>
                <p className="mono-label" style={{ color: "var(--ink-light)" }}>{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right form panel ──────────────────────────────────── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <p className="mono-label mb-2" style={{ color: "var(--orange)" }}>Sign In</p>
          <h2 className="display-md mb-10" style={{ fontSize: "2rem" }}>Your Account.</h2>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <p className="mono-label mb-2" style={{ color: "var(--ink-light)" }}>Email Address</p>
              <input id="login-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                autoComplete="email" required placeholder="you@example.com" className="input-editorial" />
            </div>
            <div>
              <p className="mono-label mb-2" style={{ color: "var(--ink-light)" }}>Password</p>
              <div className="relative">
                <input id="login-password" type={showPassword ? "text" : "password"} value={password}
                  onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required
                  placeholder="Your password" className="input-editorial pr-10" />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 p-2 transition-colors"
                  style={{ color: "var(--ink-light)" }}>
                  {showPassword ? <FaEyeSlash size={15} /> : <FaEye size={15} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-orange w-full">
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in…
                </span>
              ) : "Sign In →"}
            </button>
          </form>

          <hr className="rule mt-10 mb-8" />
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--ink-light)" }}>
            Not registered?{" "}
            <Link href="/SignUp" className="font-bold" style={{ color: "var(--orange)", textDecoration: "none" }}>
              Create an account →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;