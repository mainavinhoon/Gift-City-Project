"use client"
import React, { useState } from 'react'

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: 'Andy Horwitz',
    location: 'New York',
    occupation: 'Web Developer',
    bio: 'Lives in New York. Photographer.',
    dp: 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp', 
  })
  const [newDp, setNewDp] = useState(null)
  const [posts, setPosts] = useState([
    { id: 1, title: 'My First Post', content: 'This is the content of my first post.', image: 'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp', timestamp: '2h', likes: 34, comments: 12 },
    { id: 2, title: 'A Day in New York', content: 'Sharing my experiences from my day in New York.', image: 'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(72).webp', timestamp: '4h', likes: 56, comments: 23 },
    { id: 3, title: 'Web Development Tips', content: 'Some useful tips for web development.', image: 'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(74).webp', timestamp: '6h', likes: 78, comments: 34 },
  ])

  const handleEditToggle = () => {
    setIsEditing(!isEditing)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setProfile(prevProfile => ({
      ...prevProfile,
      [name]: value
    }))
  }

  const handleSave = () => {
    setIsEditing(false)
    if (newDp) {
      setProfile(prevProfile => ({
        ...prevProfile,
        dp: URL.createObjectURL(newDp)
      }))
    }
  }

  const handleDpChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setNewDp(file)
    }
  }

  const handleDeletePost = (postId) => {
    const updatedPosts = posts.filter(post => post.id !== postId)
    setPosts(updatedPosts)
  }

  return (
    <div className=" min-h-screen py-5">
      <div className="flex justify-center items-center h-full">
        <div className="w-full max-w-3xl px-4">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="bg-black text-white flex flex-col sm:flex-row items-center sm:items-end p-4 sm:p-0 sm:pb-4 relative" style={{ minHeight: '200px' }}>
              <div className="flex flex-col items-center sm:items-start w-full sm:w-auto mb-4 sm:mb-0 sm:ml-4 relative">
                <label htmlFor="dp" className="cursor-pointer">
                  <img
                    src={profile.dp}
                    alt="Profile"
                    className="rounded-full w-24 h-24 sm:w-36 sm:h-36 object-cover z-10 sm:static -mt-12 sm:mt-0 sm:mb-2"
                  />
                  <input
                    type="file"
                    id="dp"
                    name="dp"
                    accept="image/*"
                    className="hidden"
                    onChange={handleDpChange}
                  />
                </label>
                <button
                  onClick={handleEditToggle}
                  className="mt-4 sm:mt-2 px-4 py-1 bg-white text-black border border-black rounded"
                  style={{ height: '36px' }}
                >
                  {isEditing ? 'Cancel' : 'Edit profile'}
                </button>
              </div>
              <div className="flex flex-col items-center sm:items-start sm:ml-4 mt-4 sm:mt-0">
                <h5 className="text-lg">{profile.name}</h5>
                <p className="text-gray-400">{profile.location}</p>
              </div>
            </div>
            <div className="p-4 bg-gray-100">
              {isEditing ? (
                <div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={profile.name}
                      onChange={handleChange}
                      className="mt-1 p-2 border border-gray-300 rounded w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={profile.location}
                      onChange={handleChange}
                      className="mt-1 p-2 border border-gray-300 rounded w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Occupation</label>
                    <input
                      type="text"
                      name="occupation"
                      value={profile.occupation}
                      onChange={handleChange}
                      className="mt-1 p-2 border border-gray-300 rounded w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Bio</label>
                    <textarea
                      name="bio"
                      value={profile.bio}
                      onChange={handleChange}
                      className="mt-1 p-2 border border-gray-300 rounded w-full"
                    />
                  </div>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="text-black">
                  <div className="mb-5">
                    <p className="text-lg font-medium mb-1">About</p>
                    <div className="p-4 bg-gray-200">
                      <p className="italic mb-1">{profile.occupation}</p>
                      <p className="italic mb-1">{profile.location}</p>
                      <p className="italic mb-0">{profile.bio}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden mt-6">
            <div className="p-4 bg-gray-100">
              <p className="text-lg font-medium mb-4">Our Posts</p>
              <div>
                {posts.map(post => (
                  <div key={post.id} className="mb-4 border-b border-gray-300 pb-4">
                    <div className="mb-2">
                      <h5 className="text-lg font-semibold">{post.title}</h5>
                      <span className="text-sm text-gray-500">{post.timestamp}</span>
                    </div>
                    <p className="text-gray-700 mb-2">{post.content}</p>
                    <img
                      src={post.image}
                      alt="Post"
                      className="w-3/4 mx-auto h-40 object-cover rounded mb-2"
                    />
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-500">{post.likes} Likes</span>
                      <span className="text-sm text-gray-500">{post.comments} Comments</span>
                    </div>
                    <button
                      onClick={() => handleDeletePost(post.id)}
                      className="px-3 py-1 bg-blue-400 text-white rounded"
                    >
                      Delete Post
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
