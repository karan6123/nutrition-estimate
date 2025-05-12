import React, { useState } from 'react';
import axios from 'axios';
import NutritionOutput from './components/NutritionOutput';

function App() {
  const [dish, setDish] = useState('');
  const [nutrition, setNutrition] = useState(null);
  const [loading, setLoading] = useState(false);

  // Backend base URL fallback (optional for dev)
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!dish) return;
    try {
      setLoading(true);
      const res = await axios.post(`${API_BASE_URL}/api/nutrition`, { dish });
      setNutrition(res.data.nutrition);
    } catch (err) {
      console.error('API Error:', err);
      alert('❌ Failed to fetch nutrition info. Please check the backend or try again later.');
    } finally {
      setLoading(false);
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
          disabled={loading}
          className="w-full bg-green-500 text-white py-3 rounded hover:bg-green-600 transition disabled:bg-green-300"
        >
          {loading ? 'Estimating...' : 'Estimate Nutrition'}
        </button>
      </form>
      {nutrition && <NutritionOutput nutrition={nutrition} />}
    </div>
  );
}

export default App;

