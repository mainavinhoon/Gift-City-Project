"use client";
import { useEffect, useState } from 'react';
import { signOut, useSession } from "next-auth/react";
import { FaSignOutAlt } from 'react-icons/fa';

export default function UserInfo() {
  const { data: session } = useSession();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (session) {
        try {
          const response = await fetch(`/api/user?email=${session.user.email}`);
          if (response.ok) {
            setUser(await response.json());
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };
    fetchUserData();
  }, [session]);

  if (!session) return null;

  return (
    <div className="px-1 py-0.5">
      <div className="p-3 mb-2 border-b" style={{ borderColor: "var(--rule)" }}>
        <p className="mono-label mb-1" style={{ color: "var(--ink-light)" }}>Logged in as</p>
        {user?.username && (
          <p className="font-bold truncate" style={{ fontFamily: "var(--font-body)", color: "var(--ink)" }}>{user.username}</p>
        )}
        <p className="truncate mt-1" style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--ink-light)" }}>{session.user.email}</p>
      </div>
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="flex items-center gap-2.5 w-full px-3 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors hover:bg-orange-50"
        style={{ fontFamily: "var(--font-mono)", color: "var(--orange)", letterSpacing: "0.1em" }}
      >
        <FaSignOutAlt size={12} />
        Sign Out
      </button>
    </div>
  );
}
