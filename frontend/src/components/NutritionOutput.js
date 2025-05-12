
import React from 'react';

const NutritionOutput = ({ nutrition }) => {
  return (
    <div className="mt-8 w-full max-w-md bg-white rounded shadow p-6">
      <h2 className="text-xl font-semibold mb-4 text-green-700">Estimated Nutrition</h2>
      <ul className="space-y-2">
        {Object.entries(nutrition).map(([key, value]) => (
          <li key={key} className="flex justify-between border-b pb-2 text-gray-700">
            <span className="capitalize">{key}</span>
            <span>{value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NutritionOutput;
