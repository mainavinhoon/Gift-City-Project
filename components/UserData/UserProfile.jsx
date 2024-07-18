"use client"
import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import axios from "axios";
import UserPost from './UserPost';

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false)
  const { data: session } = useSession();
  const email = session?.user?.email;
  const [profile, setProfile] = useState({
    _id:"",
    email:email,
    name: 'Write Your Name Here',
    location: 'Write Location',
    occupation: 'Write Your Occupation',
    bio: 'Please Write Bio',
    dp: 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp', 
  })
  const [newDp, setNewDp] = useState(null)


  const handleEditToggle = () => {
    setIsEditing(!isEditing)
  }

  const handleChange = (e) => {
    const { name, value} = e.target
    setProfile(prevProfile => ({
      ...prevProfile,
      [name]: value,
      email:session?.user?.email,
 
       
    }))
  }

  const handleSave = async() => {
    setIsEditing(false)

    
    if (true) {
  
      const cloudinaryFormData = new FormData();
      cloudinaryFormData.append("file", newDp);
      cloudinaryFormData.append("upload_preset", "a4tjnp6v");

      const cloudinaryResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/dyclw2qzy/image/upload`,
        cloudinaryFormData
      );

      console.log("Cloudinary response:", cloudinaryResponse);

      const imageUrl = cloudinaryResponse.data.secure_url;

      setProfile(prevProfile => ({
        ...prevProfile,
        dp: imageUrl
       
      }))
      
    }

    const response = await fetch("api/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profile),
    });

    console.log("New profile Response",response)

  }

 


  async function fetchData() {
    try {
    
     
      const response = await fetch(`api/profile?email=${email || "nrawat1103@gmail.com"}`)
      // .then(response => response.json())
      // .then(data => console.log(data))
      // .than(prevProfile => setProfile(response))
      // .catch(error => console.error('Error:', error))

      if (response.status === 200) {
        const profileData = await response.json();
        console.log("profile data",profileData)


        setProfile(profileData);
    
       
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchData()
   
   
   console.log("Updated Profile",profile)
   //    second
   //  }
  }, [])

  const handleDpChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      
      setNewDp(file)
    }
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
                    loading='lazy'
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
          <div>
            <UserPost email={profile.email}/>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default UserProfile
