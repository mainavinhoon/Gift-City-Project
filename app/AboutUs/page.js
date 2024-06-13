import React from 'react';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import "./aboutus.css";

const AboutUs = () => {
  return (
    <div className="container max-w-screen-lg mx-auto my-10 px-8 py-6 border border-gray-300 rounded-lg shadow-lg">
      <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">About Us</h1>
      <p className="mt-5 text-lg text-gray-700">
        Welcome to Gift City, Gandhinagar! Our mission is to create a vibrant and connected community by providing a centralized hub where residents and visitors can discover, create, and share events and experiences. Whether you're looking to attend the latest events, explore them on our interactive map, or engage with the community through posts and discussions, Gift City Events has you covered. Join us in making Gift City a dynamic place to live, work, and play!
      </p>
      <h2 className="text-2xl font-bold text-center mt-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-400">Features</h2>
      <ul className="mt-5 list-disc list-inside text-gray-700 space-y-2">
        <li>
          <strong>Create Events:</strong> Easily add a title, specify the event location within Gift City, provide detailed descriptions, select the date and time, and upload images or documents to enhance your event listing.
        </li>
        <li>
          <strong>Event Map:</strong> View all upcoming events directly on our interactive map of Gift City. Each event is marked for easy navigation and planning, with filters to find events by date, type, or location.
        </li>
        <li>
          <strong>Community Section:</strong> Share your thoughts, experiences, or announcements with the community. Browse posts from other members to stay informed and connected, and engage by liking and commenting to foster community interaction.
        </li>
      </ul>
      <section className="bg-white py-8 px-4">
        <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="text-center col-span-1 md:col-span-3">
            <h2 className="section-title  mt-5 text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">The Team Behind Pacifico</h2>
          </div>
          {/* Team Member 1 */}
          <div className="col-span-1">
            <div className="team-item">
              <img src="/OmPic.jpg" className="team-img" alt="Om Makwana" />
              <h3>Om Makwana</h3>
              <div className="team-info">
                <p>A developer</p>
                <p>A talented developer with a passion for creating seamless user experiences.</p>
                <ul className="team-icon">
                  <li>
                    <a href="https://www.linkedin.com/in/om-makwana-a61063242/" className="LinkdIn">
                      <LinkedInIcon />
                    </a>
                  </li>
                  <li>
                    <a href="https://github.com/makwanaom" className="GitHub">
                      <GitHubIcon />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.instagram.com/om_makwana549/" className="Instagram">
                      <InstagramIcon />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* Team Member 2 */}
          <div className="col-span-1">
            <div className="team-item">
              <img src="/NavinPic.jpg" className="team-img" alt="navin rawat" />
              <h3>Navin Rawat</h3>
              <div className="team-info">
                <p>A developer</p>
                <p>Specializes in building robust and scalable web applications.</p>
                <ul className="team-icon">
                  <li>
                    <a href="https://www.linkedin.com/in/navin-rawat/" className="LinkdIn">
                      <LinkedInIcon />
                    </a>
                  </li>
                  <li>
                    <a href="https://github.com/mainavinhoon" className="GitHub">
                      <GitHubIcon />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.instagram.com/mainavinhoon/" className="Instagram">
                      <InstagramIcon />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* Team Member 3 */}
          <div className="col-span-1">
            <div className="team-item">
              <img src="/HardikPic.jpg" className="team-img" alt="Hardik bhammar" />
              <h3>Hardik Bhammar</h3>
              <div className="team-info">
                <p>A developer</p>
                <p>Expert in integrating cutting-edge technologies into our platform.</p>
                <ul className="team-icon">
                  <li>
                    <a href="https://www.linkedin.com/in/hardik8491" className="LinkdIn">
                      <LinkedInIcon />
                    </a>
                  </li>
                  <li>
                    <a href="https://github.com/Hardik8491" className="GitHub">
                      <GitHubIcon />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.instagram.com/hardik_8491/" className="Instagram">
                      <InstagramIcon />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
