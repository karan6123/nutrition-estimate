const axios = require('axios');

exports.estimateNutrition = async (req, res) => {
  const { dish } = req.body;

  if (!dish || typeof dish !== 'string' || dish.trim().length === 0) {
    return res.status(400).json({ error: 'Dish name is required and must be a non-empty string.' });
  }

  try {
    const response = await axios.get(
      'https://api.spoonacular.com/recipes/guessNutrition',
      {
        params: {
          title: dish,
          apiKey: process.env.SPOONACULAR_API_KEY,
        },
      }
    );

    const { calories, fat, protein, carbs } = response.data || {};

    if (!calories || !fat || !protein || !carbs) {
      return res.status(502).json({ error: 'Incomplete nutrition data received from Spoonacular.' });
    }

    return res.json({
      nutrition: {
        calories: `${calories.value} kcal`,
        protein: `${protein.value} g`,
        fat: `${fat.value} g`,
        carbs: `${carbs.value} g`,
      },
    });
  } catch (error) {
    console.error('Spoonacular API Error:', error.response?.data || err
