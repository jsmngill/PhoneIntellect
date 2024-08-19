import React from 'react';
import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import error from '../assets/error.json';


const ErrorPage404 = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-900 text-white">
    <div style={{ width: '100%', maxWidth: '300px', marginTop: '-10rem' }}> {/* Reduced margin top */}
        <Lottie animationData={error} />
    </div>
      <h1 className="text-4xl font-bold mb-4">Oops! Something went wrong.</h1>
      <p className="text-lg mb-8">The request URL is not found on this server.</p>
      <Link to="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Go back to home
      </Link>
    </div>
  );
};

export default ErrorPage404;
