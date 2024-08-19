// Home.jsx
import React from 'react';
import Lottie from 'lottie-react';
import mobile from '../assets/mobile.json';
import Search from './Search';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
    <div className="h-screen bg-gray-900 flex flex-col justify-center items-center">
      <div className="container mx-auto flex flex-col md:flex-row justify-center items-center text-white pt-10">
        <div className="md:w-1/2 md:pr-4 text-center"> {/* Adjusted padding right for larger screens */}
          <h1 className="text-5xl font-bold mb-3">Mobile Plan Price Analysis</h1> {/* Increased font size */}
          <p className="text-xl mb-8">Discover Mobile Plans from Bell, Rogers & Freedom</p> {/* Increased font size */}
          <Link to="/team" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg"> {/* Increased button size */}
            Our Team
          </Link>
        </div>
        <div className="md:w-1/2 md:pl-4"> {/* Adjusted padding left for larger screens */}
        <div style={{ width: '100%', maxWidth: '500px', marginTop: '-15rem' }}> {/* Reduced margin top */}
            <Lottie animationData={mobile} />
          </div>
        </div>
      </div>
    </div>
    <div className="flex justify-center bg-gray-900">
        <Search /> 
      </div>
    </>
  );
};

export default Home;
