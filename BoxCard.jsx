import React from "react";

const BoxCard = ({ plan }) => {
  const {
    provider,
    planName,
    monthlyCost,
    dataAllowance,
    networkCoverage,
    callAndTextAllowance,
  } = plan;

  return (
    <div className="border-8  border-white p-8 mb-4 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900">
  <div className="border-4 border-white rounded-xl bg-gray-300 p-4 size-fit">
    <h1 className="text-black text-2xl font-semibold">{provider}</h1>
  </div>
  <div className="space-y-8 text-gray-400 text-xl mt-6">
    <p className="text-white text-2xl"><strong> {planName} </strong></p>
    <p className="text-white"><strong>Monthly Cost:</strong> {monthlyCost}</p>
    <p className="text-white"><strong>Data Allowance:</strong> {dataAllowance}</p>
    <p className="text-white"><strong>Network Coverage:</strong> {networkCoverage}</p>
    <p className="text-white"><strong>Call and Text Allowance:</strong> {callAndTextAllowance}</p>
  </div>
</div>

  );
};

export default BoxCard;
