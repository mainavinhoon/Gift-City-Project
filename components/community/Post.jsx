"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart, FaRegHeart, FaComment, FaShare, FaPlus, FaTimes, FaImage } from "react-icons/fa";

const COLORS = ["#B5401A", "#1A4A2A", "#1A2A4A", "#4A1A4A", "#4A3A1A"];
function hashColor(str) { return COLORS[(str || "").split("").reduce((a, c) => a + c.charCodeAt(0), 0) % COLORS.length]; }
function initials(email = "") { return email.split("@")[0].slice(0, 2).toUpperCase(); }
function timeAgo(d) {
  if (!d) return "just now";
  const m = Math.floor((Date.now() - new Date(d)) / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

const Posts = () => {
  const { data: session } = useSession();
  const [createFormVisible, setCreateFormVisible] = useState(false);
  const [formData, setFormData] = useState({ description: "", image: "" });
  const [postData, setPostData] = useState([]);
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  async function fetchData() {
    try {
      const res = await fetch("api/communityPost");
      if (res.status === 200) setPostData(await res.json());
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }
  useEffect(() => { fetchData(); }, []);

  const handleFormChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((p) => ({ ...p, [name]: type === "file" ? files[0] : value }));
  };

  const handleLike = (id) => {
    if (!session) { toast.error("Sign in to like posts."); return; }
    setLikedPosts((p) => {
      const n = new Set(p);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.description.trim()) { toast.error("Write something first."); return; }
    setSubmitting(true);
    setCreateFormVisible(false);
    const tid = toast.loading("Sharing post…");
    try {
      let imageUrl = "";
      if (formData.image instanceof File) {
        const fd = new FormData();
        fd.append("file", formData.image);
        fd.append("upload_preset", "a4tjnp6v");
        const cr = await axios.post("https://api.cloudinary.com/v1_1/dyclw2qzy/image/upload", fd);
        imageUrl = cr.data.secure_url;
      }
      const res = await fetch("api/communityPost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: formData.description, username: session?.user?.email, image: imageUrl }),
      });
      toast.dismiss(tid);
      if (res.ok) { toast.success("Posted!"); fetchData(); setFormData({ description: "", image: "" }); }
      else toast.error("Failed to post.");
    } catch { toast.dismiss(tid); toast.error("Something went wrong."); }
    finally { setSubmitting(false); }
  };

  return (
    <section style={{ background: "var(--cream)", borderTop: "1px solid var(--rule)" }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <p className="mono-label mb-2">💬 Community Wall</p>
            <h2 className="display-md" style={{ color: "var(--ink)" }}>Community Posts.</h2>
          </div>
          {session && (
            <button onClick={() => setCreateFormVisible(true)} className="btn-ink self-start" style={{ padding: "0.6rem 1.25rem", fontSize: "0.7rem" }}>
              <FaPlus size={10} /> Share Post
            </button>
          )}
        </div>
        <hr className="rule mb-12" />

        {/* Posts grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-0 border border-[var(--rule)]">
          {loading ? (
            [...Array(3)].map((_, i) => (
              <div key={i} className="p-6 border-r last:border-r-0" style={{ borderColor: "var(--rule)" }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="skeleton w-10 h-10 rounded" />
                  <div className="flex-1 space-y-2">
                    <div className="skeleton h-3 w-1/2 rounded" />
                    <div className="skeleton h-2.5 w-1/3 rounded" />
                  </div>
                </div>
                <div className="skeleton h-40 mb-3 rounded" />
                <div className="skeleton h-3 w-full rounded" />
              </div>
            ))
          ) : postData?.length > 0 ? (
            [...postData].reverse().map((post, i) => {
              const liked = likedPosts.has(post._id || i);
              const color = hashColor(post.username);
              return (
                <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                  className="p-6 border-b sm:border-b-0 flex flex-col"
                  style={{ borderRight: i % 3 !== 2 ? "1px solid var(--rule)" : "none", borderColor: "var(--rule)" }}
                >
                  {/* Author row */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded flex items-center justify-center text-white text-xs font-black flex-shrink-0"
                      style={{ background: color, fontFamily: "var(--font-mono)" }}>
                      {initials(post.username)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold truncate" style={{ fontFamily: "var(--font-body)", color: "var(--ink)" }}>
                        {post.username || "Anonymous"}
                      </p>
                      <p className="mono-label" style={{ color: "var(--ink-light)", fontSize: "0.6rem" }}>
                        {timeAgo(post.createdAt)}
                      </p>
                    </div>
                    <span className="badge-editorial"  style={{ fontSize: "0.6rem" }}>Member</span>
                  </div>

                  {/* Image */}
                  {post.image && (
                    <div className="mb-4 border" style={{ borderColor: "var(--rule)" }}>
                      <img src={post.image} alt="post" className="w-full max-h-52 object-cover" />
                    </div>
                  )}

                  {/* Content */}
                  <p className="flex-1 mb-4 text-sm leading-relaxed line-clamp-5"
                    style={{ fontFamily: "var(--font-body)", color: "var(--ink-light)" }}>
                    {post.description}
                  </p>

                  {/* Actions */}
                  <div className="flex items-center gap-1 pt-4 border-t" style={{ borderColor: "var(--rule)" }}>
                    <button onClick={() => handleLike(post._id || i)}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold uppercase tracking-wider transition-all"
                      style={{
                        fontFamily: "var(--font-mono)",
                        color: liked ? "var(--orange)" : "var(--ink-light)",
                        letterSpacing: "0.1em",
                        fontSize: "0.65rem",
                      }}>
                      {liked ? <FaHeart size={12} /> : <FaRegHeart size={12} />} Like
                    </button>
                    <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold uppercase tracking-wider"
                      style={{ fontFamily: "var(--font-mono)", color: "var(--ink-light)", letterSpacing: "0.1em", fontSize: "0.65rem" }}>
                      <FaComment size={12} /> Reply
                    </button>
                    <button className="ml-auto flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold uppercase tracking-wider"
                      style={{ fontFamily: "var(--font-mono)", color: "var(--ink-light)", letterSpacing: "0.1em", fontSize: "0.65rem" }}>
                      <FaShare size={11} /> Share
                    </button>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="col-span-full py-24 text-center px-6">
              <p className="section-num mb-4">0</p>
              <h3 className="display-md mb-3" style={{ fontSize: "1.5rem" }}>Nobody&apos;s talking yet.</h3>
              <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-light)", fontSize: "0.9rem" }}>
                Be the legend who starts the conversation.{!session && " (Sign in first.)"}
              </p>
              {session && (
                <button onClick={() => setCreateFormVisible(true)} className="btn-orange mt-6" style={{ fontSize: "0.7rem" }}>
                  <FaPlus size={10} /> Create First Post
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Create Post Modal ─────────────────────────────────── */}
      <AnimatePresence>
        {createFormVisible && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="modal-overlay" onClick={() => setCreateFormVisible(false)}>
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.2 }}
              className="modal-box" onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <div>
                  <p className="mono-label mb-1">New Post</p>
                  <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.4rem", color: "var(--ink)" }}>
                    Share Something.
                  </h2>
                </div>
                <button onClick={() => setCreateFormVisible(false)} style={{ color: "var(--ink-light)" }}><FaTimes size={18} /></button>
              </div>
              <form onSubmit={handleFormSubmit}>
                <div className="modal-body space-y-5">
                  {/* Author preview */}
                  <div className="flex items-center gap-3 border-b pb-4" style={{ borderColor: "var(--rule)" }}>
                    <div className="w-9 h-9 rounded flex items-center justify-center text-white text-xs font-black flex-shrink-0"
                      style={{ background: hashColor(session?.user?.email), fontFamily: "var(--font-mono)" }}>
                      {initials(session?.user?.email)}
                    </div>
                    <div>
                      <p className="text-sm font-bold" style={{ fontFamily: "var(--font-body)", color: "var(--ink)" }}>{session?.user?.email}</p>
                      <p className="mono-label" style={{ color: "var(--ink-light)", fontSize: "0.6rem" }}>Posting to GIFT City Community</p>
                    </div>
                  </div>

                  <div>
                    <p className="mono-label mb-2" style={{ color: "var(--ink-light)" }}>Your Thoughts *</p>
                    <textarea name="description" value={formData.description} onChange={handleFormChange}
                      placeholder="Share insights, questions, or a hot take about Indian finance…"
                      rows={5} className="input-editorial resize-none" required />
                    <p className="mono-label mt-1 text-right" style={{ color: "var(--ink-light)", fontSize: "0.6rem" }}>
                      {formData.description.length} chars
                    </p>
                  </div>

                  <div>
                    <p className="mono-label mb-2" style={{ color: "var(--ink-light)" }}>
                      <FaImage className="inline mr-1" /> Attach Image (optional)
                    </p>
                    <input type="file" name="image" onChange={handleFormChange} accept="image/*"
                      className="w-full text-sm cursor-pointer border-b pb-2"
                      style={{ fontFamily: "var(--font-body)", color: "var(--ink-light)", borderColor: "var(--rule)" }} />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" onClick={() => setCreateFormVisible(false)} className="btn-ghost" style={{ fontSize: "0.7rem" }}>Cancel</button>
                  <button type="submit" disabled={submitting} className="btn-orange" style={{ fontSize: "0.7rem" }}>
                    {submitting ? "Posting…" : "Post Now →"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Posts;
