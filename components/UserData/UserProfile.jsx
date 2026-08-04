"use client";
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import axios from "axios";
import UserPost from './UserPost';
import toast from 'react-hot-toast';

const COLORS = ["#B5401A", "#1A4A2A", "#1A2A4A", "#4A1A4A", "#4A3A1A"];
function hashColor(str) { return COLORS[(str || "").split("").reduce((a, c) => a + c.charCodeAt(0), 0) % COLORS.length]; }

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { data: session } = useSession();
  const [profile, setProfile] = useState({
    _id: "", email: "", name: "Your Name", location: "Your Location",
    occupation: "Your Occupation", bio: "Tell the community something about yourself...",
    dp: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp",
  });
  const [newDpFile, setNewDpFile] = useState(null);
  const [dpPreview, setDpPreview] = useState(null);
  const [saving, setSaving] = useState(false);

  const email = session?.user?.email;

  async function fetchData() {
    try {
      const res = await fetch(`api/profile?email=${email}`);
      if (res.status === 200) setProfile(await res.json());
    } catch (error) { console.error("Error fetching profile:", error); }
  }
  useEffect(() => { if (email) fetchData(); }, [session]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value, email: session?.user?.email }));
  };
  const handleDpChange = (e) => {
    const file = e.target.files[0];
    if (file) { setNewDpFile(file); setDpPreview(URL.createObjectURL(file)); }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      let updatedProfile = { ...profile, email: session?.user?.email };
      if (newDpFile instanceof File) {
        const tid = toast.loading("Uploading photo…");
        const fd = new FormData();
        fd.append("file", newDpFile);
        fd.append("upload_preset", "a4tjnp6v");
        const cr = await axios.post("https://api.cloudinary.com/v1_1/dyclw2qzy/image/upload", fd);
        toast.dismiss(tid);
        updatedProfile.dp = cr.data.secure_url;
        setDpPreview(null); setNewDpFile(null);
      }
      setProfile(updatedProfile);
      const res = await fetch("api/profile", {
        method: "PUT", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProfile),
      });
      if (res.ok) { toast.success("Profile saved."); setIsEditing(false); }
      else toast.error("Failed to save changes.");
    } catch { toast.error("Something went wrong."); }
    finally { setSaving(false); }
  };

  const handleCancelEdit = () => {
    setIsEditing(false); setNewDpFile(null); setDpPreview(null);
    if (email) fetchData();
  };

  const displayDp = dpPreview || profile?.dp;
  const initials = (profile?.name || "U").slice(0, 2).toUpperCase();
  const color = hashColor(email);

  return (
    <div className="min-h-screen" style={{ paddingTop: "var(--navbar-height, 5.5rem)", background: "var(--cream)" }}>
      <div className="max-w-4xl mx-auto px-6 sm:px-8 py-16">
        <p className="mono-label mb-2" style={{ color: "var(--orange)" }}>GIFT City Directory</p>
        <h1 className="display-md mb-12">Your Profile.</h1>

        <div className="card-editorial flex flex-col md:flex-row gap-10">
          {/* Avatar side */}
          <div className="flex-shrink-0 flex flex-col items-center">
            <label htmlFor="dp-upload" className={`block cursor-pointer relative ${isEditing ? "group" : ""}`}>
              <div className="w-40 h-40 border-2 overflow-hidden flex items-center justify-center text-white text-4xl font-black"
                style={{ borderColor: "var(--ink)", background: color, fontFamily: "var(--font-mono)", boxShadow: "6px 6px 0 var(--ink)" }}>
                {displayDp ? (
                  <img src={displayDp} alt="Profile" className="w-full h-full object-cover grayscale transition-all group-hover:grayscale-0" />
                ) : initials}
              </div>
              {isEditing && (
                <>
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center" style={{ backdropFilter: "blur(2px)" }}>
                    <p className="mono-label text-white">Upload</p>
                  </div>
                  <input type="file" id="dp-upload" accept="image/*" className="hidden" onChange={handleDpChange} />
                </>
              )}
            </label>
            {!isEditing && <input type="file" id="dp-upload" accept="image/*" className="hidden" disabled />}
          </div>

          {/* Info side */}
          <div className="flex-1">
            <div className="flex flex-col h-full">
              {!isEditing ? (
                <>
                  <div className="mb-8 border-b pb-6" style={{ borderColor: "var(--rule)" }}>
                    <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "2.5rem", color: "var(--ink)", lineHeight: 1.1 }}>
                      {profile?.name}
                    </h2>
                    <p className="mono-label mt-2" style={{ color: "var(--ink-light)" }}>
                      {profile?.occupation || "GIFT City Professional"} · {profile?.location || "India"}
                    </p>
                    <p className="mono-label mt-1" style={{ color: "var(--orange)" }}>
                      {email}
                    </p>
                  </div>
                  {profile?.bio && (
                    <div className="mb-8">
                      <p className="mono-label mb-2" style={{ color: "var(--ink-light)" }}>About</p>
                      <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--ink-light)", lineHeight: 1.7 }}>
                        {profile.bio}
                      </p>
                    </div>
                  )}
                  <div className="mt-auto pt-4 flex gap-3 border-t" style={{ borderColor: "var(--rule)" }}>
                    <button onClick={() => setIsEditing(true)} className="btn-ghost" style={{ fontSize: "0.7rem", padding: "0.5rem 1.5rem" }}>
                      Edit Profile →
                    </button>
                  </div>
                </>
              ) : (
                <div className="space-y-6">
                  <div>
                    <p className="mono-label mb-1.5" style={{ color: "var(--ink-light)" }}>Full Name</p>
                    <input type="text" name="name" value={profile.name} onChange={handleChange} className="input-editorial" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="mono-label mb-1.5" style={{ color: "var(--ink-light)" }}>Location</p>
                      <input type="text" name="location" value={profile.location} onChange={handleChange} className="input-editorial" />
                    </div>
                    <div>
                      <p className="mono-label mb-1.5" style={{ color: "var(--ink-light)" }}>Occupation</p>
                      <input type="text" name="occupation" value={profile.occupation} onChange={handleChange} className="input-editorial" />
                    </div>
                  </div>
                  <div>
                    <p className="mono-label mb-1.5" style={{ color: "var(--ink-light)" }}>Bio</p>
                    <textarea name="bio" value={profile.bio} onChange={handleChange} rows={3} className="input-editorial resize-none" />
                  </div>
                  
                  <div className="mt-auto pt-6 flex gap-3 border-t" style={{ borderColor: "var(--rule)" }}>
                    <button onClick={handleCancelEdit} className="btn-ghost" style={{ fontSize: "0.7rem", padding: "0.5rem 1.5rem" }}>
                      Cancel
                    </button>
                    <button onClick={handleSave} disabled={saving} className="btn-orange" style={{ fontSize: "0.7rem", padding: "0.5rem 1.5rem" }}>
                      {saving ? "Saving…" : "Save Changes →"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* User Posts */}
        <div className="mt-20">
          <hr className="rule mb-12" />
          <p className="mono-label mb-2" style={{ color: "var(--orange)" }}>Activity</p>
          <h2 className="display-md mb-8">Your Posts.</h2>
          <UserPost email={profile?.email} />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
