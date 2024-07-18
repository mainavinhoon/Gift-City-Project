import React from 'react'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react';

const UserPost = () => {

    const [posts, setPosts] = useState([""])

const {data: session} = useSession();
const email = session?.user?.email;
      
  async function fetchData() {
    try {
    
      
      console.log("Posts Email",email);
      const response = await fetch(`api/userPosts?email=${email || "nrawat1103@gmail.com"}`)
      // .then(response => response.json())
      // .then(data => console.log(data))
      // .than(prevProfile => setProfile(response))
      // .catch(error => console.error('Error:', error))

      if (response.status === 200) {
        const postData = await response.json();
        console.log("postData",postData)


        setPosts(postData);
   
       
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
    const handleDeletePost = (postId) => {
        const updatedPosts = posts.filter(post => post.id !== postId)
        setPosts(updatedPosts)
      }


  return (
    <div>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden mt-6">
            <div className="p-4 bg-gray-100">
              <p className="text-lg font-medium mb-4">Our Posts</p>
              <div>
                {posts?.map(post => (
                  <div key={post.id} className="mb-4 border-b gap-5 border-gray-300 pb-4">
                    <div className="mb-2">
                      <h5 className="text-lg font-semibold">{}</h5>
                      <span className="text-sm text-gray-500">{post?.createdAt?.slice( 0,10 )}</span>
                    </div>
                    <p className="text-gray-700 mb-2">{post.description}</p>
                    <img
                      src={post.image}
                      alt="Post"
                      className=" w-3/4 mx-auto object-cover rounded mb-2"
                    />
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-500">{post.likes} Likes</span>
                      <span className="text-sm text-gray-500">{post.comments} Comments</span>
                    </div>
                    {/* <button
                      onClick={() => handleDeletePost(post.id)}
                      className="px-3 py-1 bg-blue-400 text-white rounded"
                    >
                      Delete Post
                    </button> */}
                  </div>
                ))}
              </div>
            </div>
          </div>
    </div>
  )
}

export default UserPost