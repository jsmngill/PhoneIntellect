import React, { useState } from 'react';
import axios from 'axios';
import Button from './Button';
import BoxCard from './BoxCard'; // Import BoxCard component

const BestPlan = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCriteria, setSelectedCriteria] = useState(null); // State to track selected criteria

  const fetchData = async (criteria) => {
    setLoading(true);
    setSelectedCriteria(criteria); // Set selected criteria
    try {
      const response = await axios.get(`http://localhost:9091/mobile-plans/best-plan/${criteria}`);
      setPlans(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePriceButtonClick = () => {
    fetchData('price');
  };

  const handleDataButtonClick = () => {
    fetchData('data');
  };

  return (
    <div className="container mx-auto mt-12">
      <h1 className="text-3xl font-bold mb-4 font-serif text-white flex justify-center m-10">Best-Plan</h1>
      <div className="flex justify-center mb-4">
        <Button text="Price" onClick={handlePriceButtonClick} />
        <Button text="Data" onClick={handleDataButtonClick} />
      </div>
      {loading ? (
        <p className="text-3xl font-bold text-center mb-8 text-gray-500">Scraping and getting the best plan for you..</p>
      ) : (
        plans.length > 0 && selectedCriteria ? ( // Check if plans exist and a criteria is selected
          plans.map(plan => <BoxCard key={plan.id} plan={plan} />) // Render BoxCard for each plan
        ) : (
          <p className="text-3xl font-bold text-center mb-8 text-gray-500">No plans available.</p>
        )
      )}
    </div>
  );
};

export default BestPlan;
