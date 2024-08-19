import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BoxCard from './BoxCard';

const Bell = () => {
  const [bellPlans, setBellPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:9091/mobile-plans/bell");
        setBellPlans(response.data);
        setLoading(false);
      } catch (error) {
        setError("An error occurred while fetching Bell plans. Please try again later.");
        setLoading(false);
        
      }
    };

    fetchData(); // Fetch data when component mounts

  }, []); // Empty dependency array ensures useEffect runs only once

  return (
    <div className="container mx-auto mt-12">
      <h1 className="text-3xl font-bold mb-4 font-serif text-white flex justify-center m-10">Best Bell Plans</h1>
      {loading && <p  className="text-3xl font-bold text-center mb-8 text-gray-500"> Scraping Bell Plans for you..</p>}
      {error && <p className="text-red-500">{error}</p>}
      {bellPlans && bellPlans.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 m-10">
          {bellPlans.map((plan, index) => (
            <BoxCard key={index} plan={plan} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Bell;
