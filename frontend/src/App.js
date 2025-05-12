
import React, { useState } from 'react';
import axios from 'axios';
import NutritionOutput from './components/NutritionOutput';

function App() {
  const [dish, setDish] = useState('');
  const [nutrition, setNutrition] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!dish) return;
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/nutrition`, { dish });
      setNutrition(res.data.nutrition);
    } catch (err) {
      alert('Failed to fetch nutrition info.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-gradient-to-r from-green-100 to-blue-100">
      <h1 className="text-4xl font-bold mb-6 text-center text-green-800">Nutrition Estimator</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded shadow">
        <input
          type="text"
          placeholder="Enter dish name"
          value={dish}
          onChange={(e) => setDish(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-3 rounded hover:bg-green-600 transition"
        >
          Estimate Nutrition
        </button>
      </form>
      {nutrition && <NutritionOutput nutrition={nutrition} />}
    </div>
  );
}

export default App;
