
const axios = require('axios');

exports.estimateNutrition = async (req, res) => {
  const { dish } = req.body;
  if (!dish) {
    return res.status(400).json({ error: 'Dish name required' });
  }

  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/guessNutrition`,
      {
        params: {
          title: dish,
          apiKey: process.env.SPOONACULAR_API_KEY
        }
      }
    );

    const { calories, fat, protein, carbs } = response.data;
    return res.json({
      nutrition: {
        calories: calories.value + ' kcal',
        protein: protein.value + ' g',
        fat: fat.value + ' g',
        carbs: carbs.value + ' g'
      }
    });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch data from Spoonacular' });
  }
};
