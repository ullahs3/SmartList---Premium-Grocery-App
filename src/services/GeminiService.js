// services/GeminiService.js
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class GeminiService {
  constructor(apiKey, isPremium = false) {
    this.apiKey = apiKey;
    this.isPremium = isPremium;
    this.baseURL = 'https://generativelanguage.googleapis.com/v1beta';
    this.freeUsesKey = 'recipe_free_uses';
    this.maxFreeUses = 3;
  }

  async checkUsageLimit() {
    if (this.isPremium) return {canUse: true, usesLeft: -1};

    try {
      const uses = await AsyncStorage.getItem(this.freeUsesKey);
      const currentUses = uses ? parseInt(uses) : 0;
      const canUse = currentUses < this.maxFreeUses;
      const usesLeft = this.maxFreeUses - currentUses;

      return {canUse, usesLeft, currentUses};
    } catch (error) {
      console.error('Error checking usage:', error);
      return {canUse: false, usesLeft: 0};
    }
  }

  async incrementUsage() {
    if (this.isPremium) return;

    try {
      const uses = await AsyncStorage.getItem(this.freeUsesKey);
      const currentUses = uses ? parseInt(uses) : 0;
      await AsyncStorage.setItem(
        this.freeUsesKey,
        (currentUses + 1).toString(),
      );
    } catch (error) {
      console.error('Error incrementing usage:', error);
    }
  }

  async parseRecipeWithAI(recipeText) {
    try {
      console.log(
        'Starting AI parse for:',
        recipeText.substring(0, 50) + '...',
      );

      const prompt = `Extract ingredients from this recipe and return them as a JSON array. Each ingredient should be a string with quantity and name. Recipe: "${recipeText}"

Example format: ["2 lbs chicken breast", "1/4 cup olive oil", "3 cloves garlic", "Salt and pepper to taste"]

Only return the JSON array, nothing else:`;

      const requestBody = {
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      };

      console.log('Request body:', JSON.stringify(requestBody, null, 2));

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${this.apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        },
      );

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Gemini API error:', response.status, errorText);
        return this.parseRecipeLocally(recipeText);
      }

      const data = await response.json();
      console.log('Full Gemini response:', JSON.stringify(data, null, 2));

      const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      console.log('Generated text:', generatedText);

      if (!generatedText) {
        console.error('No text generated from Gemini');
        return this.parseRecipeLocally(recipeText);
      }

      // Try to parse JSON from the response
      try {
        let jsonText = generatedText;

        // Remove markdown code blocks if present
        if (generatedText.includes('```json')) {
          const jsonMatch = generatedText.match(/```json\s*([\s\S]*?)\s*```/);
          if (jsonMatch) {
            jsonText = jsonMatch[1].trim();
          }
        } else {
          // Try to find JSON array in the text
          const arrayMatch = generatedText.match(/\[[\s\S]*\]/);
          if (arrayMatch) {
            jsonText = arrayMatch[0];
          }
        }

        console.log('Extracted JSON text:', jsonText);

        const ingredients = JSON.parse(jsonText);
        console.log('Parsed ingredients from Gemini:', ingredients);

        // Ensure all ingredients are strings and filter out empty ones
        const cleanIngredients = ingredients
          .filter(item => item != null) // Remove null/undefined
          .map(item => String(item).trim()) // Convert to string and trim
          .filter(item => item.length > 0); // Remove empty strings

        console.log('Cleaned ingredients:', cleanIngredients);

        return Array.isArray(cleanIngredients) && cleanIngredients.length > 0
          ? cleanIngredients
          : this.parseRecipeLocally(recipeText);
      } catch (parseError) {
        console.error('Error parsing Gemini JSON response:', parseError);
        console.error('Generated text was:', generatedText);
      }

      // Fallback to local parsing
      return this.parseRecipeLocally(recipeText);
    } catch (error) {
      console.error('Gemini API request failed:', error);
      return this.parseRecipeLocally(recipeText);
    }
  }

  parseRecipeLocally(recipeText) {
    // Ensure recipeText is a string
    const text = String(recipeText || '').toLowerCase();

    // Enhanced local parsing with more ingredients
    const ingredientPatterns = {
      proteins: {
        keywords: [
          'chicken',
          'beef',
          'pork',
          'fish',
          'salmon',
          'turkey',
          'lamb',
          'shrimp',
          'tofu',
          'eggs',
        ],
        category: 'Meat & Seafood',
      },
      vegetables: {
        keywords: [
          'onion',
          'garlic',
          'tomato',
          'carrot',
          'celery',
          'bell pepper',
          'mushroom',
          'spinach',
          'broccoli',
          'zucchini',
          'cucumber',
          'lettuce',
        ],
        category: 'Produce',
      },
      dairy: {
        keywords: [
          'milk',
          'cheese',
          'butter',
          'yogurt',
          'cream',
          'parmesan',
          'mozzarella',
          'cheddar',
        ],
        category: 'Dairy',
      },
      pantry: {
        keywords: [
          'flour',
          'sugar',
          'salt',
          'pepper',
          'oil',
          'vinegar',
          'soy sauce',
          'rice',
          'pasta',
          'bread',
        ],
        category: 'Pantry',
      },
      herbs: {
        keywords: [
          'basil',
          'oregano',
          'thyme',
          'rosemary',
          'parsley',
          'cilantro',
          'dill',
          'sage',
        ],
        category: 'Herbs & Spices',
      },
    };

    const foundIngredients = [];

    // Recipe-specific ingredient sets
    if (text.includes('chicken')) {
      foundIngredients.push(
        {name: 'Chicken breast - 2 lbs', category: 'Meat & Seafood'},
        {name: 'Olive oil - 2 tbsp', category: 'Pantry'},
        {name: 'Garlic - 3 cloves', category: 'Produce'},
        {name: 'Salt and pepper', category: 'Herbs & Spices'},
      );
    }

    if (text.includes('pasta')) {
      foundIngredients.push(
        {name: 'Pasta - 1 lb', category: 'Pantry'},
        {name: 'Parmesan cheese - 1/2 cup', category: 'Dairy'},
        {name: 'Fresh basil', category: 'Herbs & Spices'},
        {name: 'Olive oil - 1/4 cup', category: 'Pantry'},
      );
    }

    if (text.includes('salad')) {
      foundIngredients.push(
        {name: 'Mixed greens - 1 bag', category: 'Produce'},
        {name: 'Cherry tomatoes - 1 cup', category: 'Produce'},
        {name: 'Cucumber - 1 medium', category: 'Produce'},
        {name: 'Salad dressing', category: 'Pantry'},
      );
    }

    if (text.includes('soup')) {
      foundIngredients.push(
        {name: 'Vegetable broth - 32 oz', category: 'Pantry'},
        {name: 'Carrots - 3 medium', category: 'Produce'},
        {name: 'Celery - 3 stalks', category: 'Produce'},
        {name: 'Onion - 1 medium', category: 'Produce'},
      );
    }

    // Search for individual ingredients in text
    Object.entries(ingredientPatterns).forEach(([type, pattern]) => {
      pattern.keywords.forEach(keyword => {
        if (
          text.includes(keyword) &&
          !foundIngredients.some(ing =>
            ing.name.toLowerCase().includes(keyword),
          )
        ) {
          foundIngredients.push({
            name: this.capitalizeFirst(keyword),
            category: pattern.category,
          });
        }
      });
    });

    // If no specific ingredients found, return generic list
    if (foundIngredients.length === 0) {
      return [{name: 'Check recipe for ingredients', category: 'Other'}];
    }

    return foundIngredients.map(ing => ing.name);
  }

  capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  categorizeIngredient(ingredient) {
    // Ensure ingredient is a string
    const text = String(ingredient || '').toLowerCase();

    const categories = {
      'Meat & Seafood': [
        'chicken',
        'beef',
        'pork',
        'fish',
        'salmon',
        'turkey',
        'lamb',
        'shrimp',
        'meat',
      ],
      Produce: [
        'onion',
        'garlic',
        'tomato',
        'carrot',
        'celery',
        'pepper',
        'mushroom',
        'spinach',
        'lettuce',
        'cucumber',
        'broccoli',
      ],
      Dairy: [
        'milk',
        'cheese',
        'butter',
        'yogurt',
        'cream',
        'parmesan',
        'mozzarella',
      ],
      Pantry: [
        'flour',
        'sugar',
        'salt',
        'pepper',
        'oil',
        'vinegar',
        'rice',
        'pasta',
        'bread',
        'sauce',
      ],
      'Herbs & Spices': [
        'basil',
        'oregano',
        'thyme',
        'rosemary',
        'parsley',
        'cilantro',
        'spice',
      ],
    };

    for (const [category, keywords] of Object.entries(categories)) {
      if (keywords.some(keyword => text.includes(keyword))) {
        return category;
      }
    }
    return 'Other';
  }

  async parseRecipe(recipeText) {
    const usageCheck = await this.checkUsageLimit();

    if (!usageCheck.canUse) {
      throw new Error(
        `Free recipe parsing limit reached. You have ${usageCheck.usesLeft} uses remaining. Upgrade to Premium for unlimited access!`,
      );
    }

    try {
      // Try AI parsing first, fallback to local
      const ingredients = await this.parseRecipeWithAI(recipeText);

      // Increment usage only on successful parse
      await this.incrementUsage();

      // Convert to proper format for the app - ensure each ingredient is a string
      return ingredients.map((ingredient, index) => {
        // Make sure ingredient is a string
        const ingredientString = String(ingredient || '').trim();

        return {
          id: Date.now() + index,
          name: ingredientString,
          completed: false,
          category: this.categorizeIngredient(ingredientString),
          fromRecipe: true,
        };
      });
    } catch (error) {
      console.error('Recipe parsing error:', error);
      throw error;
    }
  }

  // Method to set premium status
  setPremiumStatus(isPremium) {
    this.isPremium = isPremium;
  }

  // Method to get usage stats
  async getUsageStats() {
    if (this.isPremium) {
      return {isPremium: true, usesLeft: -1, totalUses: -1};
    }

    try {
      const uses = await AsyncStorage.getItem(this.freeUsesKey);
      const currentUses = uses ? parseInt(uses) : 0;
      const usesLeft = Math.max(0, this.maxFreeUses - currentUses);

      return {
        isPremium: false,
        usesLeft,
        totalUses: currentUses,
        maxFreeUses: this.maxFreeUses,
      };
    } catch (error) {
      console.error('Error getting usage stats:', error);
      return {isPremium: false, usesLeft: 0, totalUses: 0};
    }
  }
}

// No separate export needed since we're using export default class
