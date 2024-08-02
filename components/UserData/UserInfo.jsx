"use client";

import { useEffect, useState } from 'react';
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function UserInfo() {
  const { data: session } = useSession();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (session) {
        try {
          const response = await fetch(`/api/user?email=${session.user.email}`);
          if (response.ok) {
            const data = await response.json();
            setUser(data);
          } else {
            console.error('Failed to fetch user data');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, [session]);

  const handleSignIn = async () => {
    // Implement your sign-in logic if needed
  };

  return (
    <div className="grid place-items-center">
      <div className=" p-4  flex flex-col  rounded-lg">
        {session ? (
          <>
            <div className="flex flex-col w-78 md:w-64   gap-5">
              <div className="text-gray-800 text-lg">Username: {user?.username}</div>
              <div className="text-gray-800 text-lg">Email: {session.user.email}</div>
            </div>
            <button
              onClick={() => signOut()}
              className=" flex justify-center items-center mt-3 p-2  rounded hover:bg-gray-200 transition duration-300 ease-in-out"
            >
              Log Out
            </button>
          </>
        ) : (
          <button
            onClick={handleSignIn}
            className="bg-green-500 text-white font-bold px-6 py-2 mt-3 rounded hover:bg-green-600 transition duration-300 ease-in-out"
          >
            Sign In
          </button>
        )}
      </div>
    </div>
  );
}
