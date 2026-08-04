"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaTimes, FaMapMarkerAlt, FaCalendarAlt, FaTicketAlt } from "react-icons/fa";
import { MdEventNote } from "react-icons/md";

function EventCard({ event, index, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07 }}
      className="card-editorial flex flex-col cursor-pointer"
      onClick={() => onClick(event)}
    >
      {event.image && (
        <div className="w-full h-44 overflow-hidden mb-4 -mx-0 border-b" style={{ borderColor: "var(--rule)" }}>
          <img src={event.image} alt={event.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
        </div>
      )}
      <div className="flex items-start justify-between gap-2 mb-2">
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.1rem", color: "var(--ink)", lineHeight: 1.25 }}>
          {event.title}
        </h2>
        {event.category && <span className="badge-editorial flex-shrink-0">{event.category}</span>}
      </div>
      <div className="space-y-1.5 mt-2 flex-1">
        {event.location && (
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt size={11} style={{ color: "var(--orange)" }} />
            <span style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "var(--ink-light)" }}>
              {event.location}
            </span>
          </div>
        )}
        {event.date && (
          <div className="flex items-center gap-2">
            <FaCalendarAlt size={11} style={{ color: "var(--orange)" }} />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--ink-light)" }}>
              {event.date}
            </span>
          </div>
        )}
      </div>
      <div className="mt-4 pt-4 flex items-center justify-between border-t" style={{ borderColor: "var(--rule)" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", fontWeight: 700, color: "var(--orange)" }}>
          {event.price || "FREE"}
        </span>
        <button className="btn-ghost" style={{ padding: "0.35rem 1rem", fontSize: "0.65rem" }}>
          Know More →
        </button>
      </div>
    </motion.div>
  );
}

function SkeletonCard() {
  return (
    <div className="card-editorial">
      <div className="skeleton h-44 w-full mb-4" />
      <div className="skeleton h-4 w-3/4 mb-2 rounded" />
      <div className="skeleton h-3 w-1/2 mb-1 rounded" />
      <div className="skeleton h-3 w-2/5 rounded" />
    </div>
  );
}

const Events = () => {
  const { data: session } = useSession();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [createFormVisible, setCreateFormVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "", location: "", date: "", price: "", description: "", category: "", image: "",
  });
  const [eventData, setEventData] = useState([]);

  async function fetchData() {
    try {
      const res = await fetch("api/EventCreate");
      if (res.status === 200) setEventData(await res.json());
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }

  useEffect(() => { fetchData(); }, []);

  const handleFormChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((p) => ({ ...p, [name]: type === "file" ? files[0] : value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.date) { toast.error("Title and date are required."); return; }
    setCreateFormVisible(false);
    const tid = toast.loading("Uploading event…");
    try {
      let imageUrl = "";
      if (formData.image instanceof File) {
        const fd = new FormData();
        fd.append("file", formData.image);
        fd.append("upload_preset", "a4tjnp6v");
        const cr = await axios.post("https://api.cloudinary.com/v1_1/dyclw2qzy/image/upload", fd);
        imageUrl = cr.data.secure_url;
      }
      const res = await fetch("api/EventCreate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, image: imageUrl }),
      });
      toast.dismiss(tid);
      if (res.ok) { toast.success("Event created!"); fetchData(); setFormData({ title: "", location: "", date: "", price: "", description: "", category: "", image: "" }); }
      else toast.error("Failed to create event.");
    } catch (err) { toast.dismiss(tid); toast.error("Something went wrong."); }
  };

  return (
    <section id="Events" style={{ background: "var(--cream)", borderTop: "1px solid var(--rule)" }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <p className="mono-label mb-2">📅 What&apos;s On</p>
            <h2 className="display-md" style={{ color: "var(--ink)" }}>Upcoming Events.</h2>
          </div>
          {session && (
            <button onClick={() => setCreateFormVisible(true)} className="btn-ink self-start" style={{ padding: "0.6rem 1.25rem", fontSize: "0.7rem" }}>
              <FaPlus size={10} /> Create Event
            </button>
          )}
        </div>
        <hr className="rule mb-12" />

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px border border-[var(--rule)]">
          {loading ? (
            [...Array(3)].map((_, i) => (
              <div key={i} className="p-6 border-b sm:border-b-0 sm:border-r last:border-r-0" style={{ borderColor: "var(--rule)" }}>
                <SkeletonCard />
              </div>
            ))
          ) : eventData.length > 0 ? (
            [...eventData].reverse().map((event, i) => (
              <div key={i} className="p-6" style={{ borderRight: i % 3 !== 2 ? "1px solid var(--rule)" : "none" }}>
                <EventCard event={event} index={i} onClick={setSelectedEvent} />
              </div>
            ))
          ) : (
            <div className="col-span-full py-24 flex flex-col items-center text-center px-6">
              <p className="section-num mb-4">0</p>
              <h3 className="display-md mb-3" style={{ fontSize: "1.5rem" }}>No Events Yet.</h3>
              <p style={{ fontFamily: "var(--font-body)", color: "var(--ink-light)", fontSize: "0.9rem" }}>
                The calendar is suspiciously empty.{session ? " Create the first one." : " Sign in to create one."}
              </p>
              {session && (
                <button onClick={() => setCreateFormVisible(true)} className="btn-orange mt-6" style={{ fontSize: "0.7rem" }}>
                  <FaPlus size={10} /> Create Event
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Event Detail Modal ───────────────────────────────── */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="modal-overlay" onClick={() => setSelectedEvent(null)}>
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.2 }}
              className="modal-box" onClick={(e) => e.stopPropagation()}
            >
              {selectedEvent.image && (
                <div className="h-48 overflow-hidden border-b" style={{ borderColor: "var(--rule)" }}>
                  <img src={selectedEvent.image} alt={selectedEvent.title} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="modal-header">
                <div>
                  <p className="mono-label mb-1">{selectedEvent.category || "Event"}</p>
                  <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.4rem", color: "var(--ink)" }}>
                    {selectedEvent.title}
                  </h2>
                </div>
                <button onClick={() => setSelectedEvent(null)} style={{ color: "var(--ink-light)" }}>
                  <FaTimes size={18} />
                </button>
              </div>
              <div className="modal-body">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[
                    { icon: FaMapMarkerAlt, label: "Location", value: selectedEvent.location || "TBA" },
                    { icon: FaCalendarAlt,  label: "Date",     value: selectedEvent.date || "TBA" },
                    { icon: FaTicketAlt,    label: "Entry",    value: selectedEvent.price || "Free" },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="border-t pt-3" style={{ borderColor: "var(--rule)" }}>
                      <p className="mono-label mb-1" style={{ color: "var(--ink-light)" }}>{label}</p>
                      <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", fontWeight: 600, color: "var(--ink)" }}>{value}</p>
                    </div>
                  ))}
                </div>
                {selectedEvent.description && (
                  <div>
                    <p className="mono-label mb-2" style={{ color: "var(--ink-light)" }}>About</p>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--ink-light)", lineHeight: 1.7 }}>
                      {selectedEvent.description}
                    </p>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button onClick={() => setSelectedEvent(null)} className="btn-ghost" style={{ fontSize: "0.7rem", padding: "0.5rem 1rem" }}>Close</button>
                <button className="btn-orange" style={{ fontSize: "0.7rem" }}>RSVP Now →</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Create Event Modal ───────────────────────────────── */}
      <AnimatePresence>
        {createFormVisible && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="modal-overlay" onClick={() => setCreateFormVisible(false)}>
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.2 }}
              className="modal-box" onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <div>
                  <p className="mono-label mb-1">New Event</p>
                  <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.4rem", color: "var(--ink)" }}>Create Event.</h2>
                </div>
                <button onClick={() => setCreateFormVisible(false)} style={{ color: "var(--ink-light)" }}><FaTimes size={18} /></button>
              </div>
              <form onSubmit={handleFormSubmit}>
                <div className="modal-body space-y-4">
                  <div>
                    <p className="mono-label mb-1.5" style={{ color: "var(--ink-light)" }}>Event Title *</p>
                    <input type="text" name="title" value={formData.title} onChange={handleFormChange}
                      placeholder="e.g. GIFT City FinTech Summit 2025" className="input-editorial" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="mono-label mb-1.5" style={{ color: "var(--ink-light)" }}>Location</p>
                      <input type="text" name="location" value={formData.location} onChange={handleFormChange}
                        placeholder="GIFT City, Gujarat" className="input-editorial" />
                    </div>
                    <div>
                      <p className="mono-label mb-1.5" style={{ color: "var(--ink-light)" }}>Date *</p>
                      <input type="date" name="date" value={formData.date} onChange={handleFormChange}
                        className="input-editorial" required />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="mono-label mb-1.5" style={{ color: "var(--ink-light)" }}>Entry Price</p>
                      <input type="text" name="price" value={formData.price} onChange={handleFormChange}
                        placeholder="Free / ₹500" className="input-editorial" />
                    </div>
                    <div>
                      <p className="mono-label mb-1.5" style={{ color: "var(--ink-light)" }}>Category</p>
                      <select name="category" value={formData.category} onChange={handleFormChange} className="input-editorial">
                        <option value="">Select…</option>
                        <option>Conference</option>
                        <option>Workshop</option>
                        <option>Networking</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <p className="mono-label mb-1.5" style={{ color: "var(--ink-light)" }}>Description</p>
                    <textarea name="description" value={formData.description} onChange={handleFormChange}
                      rows={3} placeholder="What will attendees get out of this?" className="input-editorial resize-none" />
                  </div>
                  <div>
                    <p className="mono-label mb-1.5" style={{ color: "var(--ink-light)" }}>Cover Image</p>
                    <input type="file" name="image" onChange={handleFormChange} accept="image/*"
                      className="w-full text-sm cursor-pointer border-b pb-2"
                      style={{ fontFamily: "var(--font-body)", color: "var(--ink-light)", borderColor: "var(--rule)" }} />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" onClick={() => setCreateFormVisible(false)} className="btn-ghost" style={{ fontSize: "0.7rem" }}>Cancel</button>
                  <button type="submit" className="btn-orange" style={{ fontSize: "0.7rem" }}><FaPlus size={10} /> Create</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Events;
