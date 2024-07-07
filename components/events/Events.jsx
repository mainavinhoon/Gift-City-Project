"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { toast } from 'react-hot-toast';
import { duration } from "@mui/material";

const Events = () => {
  const { data: session } = useSession();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [createFormVisible, setCreateFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    date: "",
    price: "",
    description: "",
    image: "", // To store the selected image file
  });
  const [eventData, setEventData] = useState([]);


  

  const handleKnowMoreClick = (event) => {
    setSelectedEvent(event);
  };

  const handleCreateEventClick = () => {
    setCreateFormVisible(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    
    console.log("Form submit clicked");
    try {
      setCreateFormVisible(false);
      toast.success('You did it, event is uploading!', {duration:3000});
      const cloudinaryFormData = new FormData();
      cloudinaryFormData.append("file", formData.image);
      cloudinaryFormData.append("upload_preset", "a4tjnp6v");

      const cloudinaryResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/dyclw2qzy/image/upload`,
        cloudinaryFormData
      );

      console.log("Cloudinary response:", cloudinaryResponse);

      const imageUrl = cloudinaryResponse.data.secure_url;

      const newEvent = {
        ...formData,
        image: imageUrl,
      };

      console.log("New event data:", newEvent);

      const response = await fetch("api/EventCreate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEvent),
      });

      console.log("API response:", response);
      

      
      fetchData();
     

    } catch (error) {
      console.error("Error uploading image or creating event:", error);
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
        const response = await fetch("api/EventCreate");
        if (response.status === 200) {
          const data = await response.json();
         return setEventData(data);
          console.log(data)
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

   useEffect(() => {
     fetchData()
   
    //  return () => {
    //    second
    //  }
   }, [])
   
 

  return (
    <div id="Events">
      <div className="flex gap-x-3">
        <div className="text-2xl font-medium py-4 underline">Events</div>
        {session ? (
          <div className="ml-auto m-6">
            <button
              onClick={handleCreateEventClick}
              className="bg-blue-500 text-white p-2 rounded-md hover:bg-black"
            >
              + Create Event
            </button>
          </div>
        ) : null}
      </div>
      <div className="grid  flex-rev sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-4">
        {eventData.length > 1 ? (
          eventData.map((event, index) => (
            <div
              key={index}
              className="flex  flex-col text-start p-4 h-fit border-gray-300 border py-4 gap-3 m-4 shadow-2xl rounded-sm"
            >
              <img src={event.image} alt={event.title} />
              <h2 className="text-black font-semibold">{event.title}</h2>
              <h4 className="text-base font-medium">{event.location}</h4>
              <h5>{event.date}</h5>
              <div className="mt-6 flex items-center justify-between gap-20">
                <p className="text-red-800 text-xs">{event.price}</p>
                <button
                  className="bg-black rounded-md text-white px-8 py-3"
                  onClick={() => handleKnowMoreClick(event)}
                >
                  Know More
                </button>
              </div>
            </div>
          )).reverse()
        ) : (
          <div className="text-2xl font-extrabold flex flex-col items-center">
            NO LIVE EVENT FOUND
          </div>
        )}
      </div>

      {selectedEvent && (
        <div className="fixed inset-0 flex items-center justify-center z-50 overflow-y-auto">
          <div className="modal-background absolute bg-black opacity-40 inset-0"></div>
          <div className="modal-container absolute bg-white w-4/5 md:w-1/2 mx-auto rounded-md shadow-lg">
            <div className="modal-content p-6">
              <h2 className="text-3xl font-semibold mb-4">{selectedEvent.title}</h2>
              <img
                src={selectedEvent.image}
                alt={selectedEvent.title}
                className="my-4 h-60 w-full object-cover rounded-md"
              />
              <p className="text-base text-gray-600">{selectedEvent.location}</p>
              <p className="text-base text-gray-600">{selectedEvent.date}</p>
              <p className="text-base text-gray-600">{selectedEvent.price}</p>
              <p className="text-base text-black">
                <span>
                  Description: <br />
                </span>
                {selectedEvent.description}
              </p>
              <div className="flex gap-x-3">
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="bg-gray-400 m-3 text-white px-4 py-2 rounded-md hover:bg-gray-500"
                >
                  Close
                </button>
                <button
                  className="bg-blue-500 m-3 ml-auto text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  onClick={() => {
                    setSelectedEvent(null);
                  }}
                >
                  RSVP
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {createFormVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-background absolute bg-black opacity-40 inset-0"></div>
          <div className="modal-container absolute bg-white w-4/5 md:w-1/2 mx-auto rounded-md shadow-lg">
            <div className="modal-content p-6">
              <form onSubmit={handleFormSubmit}>
                <h2 className="text-3xl font-semibold mb-4">Create Event</h2>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  placeholder="Title"
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border rounded-md"
                />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  placeholder="Location"
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border rounded-md"
                />
                <input
                  type="text"
                  name="date"
                  value={formData.date}
                  placeholder="Date"
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border rounded-md"
                />
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  placeholder="Price"
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border rounded-md"
                />
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
                    Create Event
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

export default Events;
