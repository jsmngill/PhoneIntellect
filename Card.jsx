// Card.jsx
import React from 'react';
import BoxCard from './BoxCard';

const Card = ({ plans, provider }) => {
  return (
    <div className="border-8 border-white bg-gray-300 container mx-auto mt-12 rounded-xl">
      <h1 className="text-3xl font-bold mb-4 font-serif text-black flex justify-center m-10">Best {provider} Plans</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 m-10">
        {plans.map((plan, index) => (
          <BoxCard key={index} plan={plan} />
        ))}
      </div>
    </div>
  );
};

export default Card;
