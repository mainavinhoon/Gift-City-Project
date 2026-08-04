'use client'
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { FaTrash } from 'react-icons/fa';

function timeAgo(d) {
  if (!d) return "just now";
  const m = Math.floor((Date.now() - new Date(d)) / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

const UserPost = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const email = session?.user?.email;

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/userPosts?email=${email}`);
      if (response.ok) {
        setPosts(await response.json());
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (email) fetchData();
  }, [email]);

  const handleDeletePost = async (postId) => {
    // In a real app this should make an API call to delete
    setPosts(posts.filter(post => post._id !== postId && post.id !== postId));
  };

  if (loading) {
    return (
      <div className="grid sm:grid-cols-2 gap-0 border border-[var(--rule)]">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="p-6 border-b sm:border-b-0 sm:border-r last:border-r-0" style={{ borderColor: "var(--rule)" }}>
            <div className="skeleton h-32 w-full mb-3 rounded" />
            <div className="skeleton h-4 w-3/4 mb-2 rounded" />
            <div className="skeleton h-4 w-1/2 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="card-editorial text-center py-12">
        <p className="mono-label mb-2" style={{ color: "var(--ink-light)" }}>Activity Feed</p>
        <p style={{ fontFamily: "var(--font-body)", color: "var(--ink)" }}>You haven't posted anything yet.</p>
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 gap-0 border border-[var(--rule)]">
      {posts.map((post, i) => (
        <div key={post._id || post.id || i} className="p-6 border-b sm:border-b-0 flex flex-col"
             style={{ borderRight: i % 2 === 0 ? "1px solid var(--rule)" : "none", borderColor: "var(--rule)" }}>
          
          <div className="flex items-center justify-between mb-4">
            <span className="mono-label" style={{ color: "var(--ink-light)" }}>
              {timeAgo(post.createdAt)}
            </span>
            <button onClick={() => handleDeletePost(post._id || post.id)} 
                    className="text-xs text-red-600 hover:text-red-800 transition-colors">
              <FaTrash size={12} />
            </button>
          </div>

          {post.image && (
            <div className="mb-4 border" style={{ borderColor: "var(--rule)" }}>
              <img src={post.image} alt="Post" className="w-full h-48 object-cover" />
            </div>
          )}
          
          <p className="flex-1 text-sm leading-relaxed mb-4" style={{ fontFamily: "var(--font-body)", color: "var(--ink)" }}>
            {post.description || post.title}
          </p>

          <div className="pt-4 border-t flex items-center justify-between" style={{ borderColor: "var(--rule)" }}>
            <span className="mono-label" style={{ color: "var(--orange)" }}>{post.likes || 0} LIKES</span>
            <span className="mono-label" style={{ color: "var(--ink-light)" }}>{post.comments || 0} COMMENTS</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserPost;
