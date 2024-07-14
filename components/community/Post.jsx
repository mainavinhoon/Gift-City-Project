"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { toast } from 'react-hot-toast';
import { FaUserCircle } from "react-icons/fa";
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import { BiLike } from "react-icons/bi";
import { BiCommentAdd } from "react-icons/bi";


const Posts = () => {
  const { data: session } = useSession();
  console.log(session?.user?.name);
//   const [selectedEvent, setSelectedEvent] = useState(null);
  const [createFormVisible, setCreateFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    // username: "",
    // location: "",
    // date: "",
    // price: "",
    description: "",
    image: "", // To store the selected image file
  });
  const [postData, setPostData] = useState([]);

  

  const handleKnowMoreClick = (event) => {
    setSelectedEvent(event);
  };

  const handleCreateEventClick = () => {
    setCreateFormVisible(true);
  };

    
  const likeHnadler = async () => {

  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    console.log("Form submit clicked");
    try {
      setCreateFormVisible(false);
      toast.success('You did it, Post is uploading!', {duration:3000});
      const cloudinaryFormData = new FormData();
      cloudinaryFormData.append("file", formData.image);
      cloudinaryFormData.append("upload_preset", "a4tjnp6v");

      const cloudinaryResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/dyclw2qzy/image/upload`,
        cloudinaryFormData
      );

      console.log("Cloudinary response:", cloudinaryResponse);

      const imageUrl = cloudinaryResponse.data.secure_url;

      const newPost = {
        ...formData,
        username: session?.user?.email,
        image: imageUrl,
      };

      console.log("New Post data:", newPost);

      const response = await fetch("api/communityPost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });

      console.log("API response:", response);
      

      
      fetchData();
     

    } catch (error) {
      console.error("Error uploading image or creating Post:", error);
    }
  };

  const handleFormChange = (e) => {
    const { name, value, type, files } = e.target;


    if (type === "file") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleCloseForm = () => {
    setCreateFormVisible(false);
  };



   async function fetchData() {
      try {
        const response = await fetch("api/communityPost");
        if (response.status === 200) {
          const data = await response.json();
          console.log(data)
         return setPostData(data);
         
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

   useEffect(() => {
     fetchData()

    
    
    //    second
    //  }
   }, [])
   
 

  return (
    <div id="Events">
      <div className="flex gap-x-3">
        <div className="text-2xl font-medium py-4 underline">Community Posts</div>
        {session ? (
          <div className="ml-auto m-6">
            <button
              onClick={handleCreateEventClick}
              className="bg-blue-500 text-white p-2 rounded-md hover:bg-black"
            >
              + Create Post
            </button>
          </div>
        ) : null}
      </div>
      <div className="grid  flex-rev  h-fit sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-4">
        {postData.length > 1 ? (
          postData.map((post, index) => (
            <div
              key={index}
              className="flex w-3/4 flex-col ml-12 py-4 border-gray-300 gap-2  shadow-xl rounded-sm"
            >
              <div className="flex px-4">
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe"><FaUserCircle /> </Avatar>
              <div>
              <h2 className=" ml-2"> <span className=" font-semibold">  {post.username} </span> Posted...</h2>

              <h6 className="ml-2 font-light text-s">{post.createdAt.slice( 0,10 )}</h6>
              </div>
              </div>
          
              <img src={post.image} alt={"image"} />
              {/* <h2 className="text-black font-semibold">{}</h2> */}
              <h4 className=" p-4 font-small">{post.description}</h4>
              <div className="flex relative  mb-0 gap-5 justify-evenly">
                  <div className=" "><BiLike size={25}/></div>
                  <div><BiCommentAdd size={25}/></div>
              </div>
             
          
            </div>
          )).reverse()
        ) : (
          <div className="text-2xl font-extrabold flex flex-col items-center">
            NO Posts Found
          </div>
        )}
      </div>


      {createFormVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-background absolute bg-black opacity-40 inset-0"></div>
          <div className="modal-container absolute bg-white w-4/5 md:w-1/2 mx-auto rounded-md shadow-lg">
            <div className="modal-content p-6">
              <form onSubmit={handleFormSubmit}>
                <h2 className="text-3xl font-semibold mb-4">Create Post</h2>
              
             
                <textarea
                  name="description"
                  value={formData.description}
                  placeholder="Description"
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border rounded-md"
                />
                <input
                  type="file"
                  name="image"
                  onChange={handleFormChange}
                  className="w-full"
                />
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={handleCloseForm}
                    className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 mr-2"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    onClick={handleFormSubmit}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  >
                    Create Post
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Posts;
