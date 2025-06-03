export const AppConfig = {
  // AI Services
  GEMINI_API_KEY: "AIzaSyBr2XI4PGjYwmO9uiwptjTUJdSI1zzmeWs",
  OPENAI_API_KEY: "your-openai-api-key-here",

  // Subscription & Payments
  STRIPE_PUBLISHABLE_KEY: "pk_test_your-stripe-key-here",
  REVENUECAT_API_KEY: "your-revenuecat-key-here",

  // Analytics & Tracking
  FIREBASE_CONFIG: {
    apiKey: "your-firebase-api-key",
    authDomain: "smartlist-xxxxx.firebaseapp.com",
    projectId: "smartlist-xxxxx",
    storageBucket: "smartlist-xxxxx.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:android:xxxxx",
  },

  // Facebook/Meta
  FACEBOOK_APP_ID: "your-facebook-app-id",

  // App Settings
  APP_SETTINGS: {
    // Free tier limits
    FREE_RECIPE_PARSES_PER_MONTH: 3,

    // Subscription pricing
    PREMIUM_PRICE_MONTHLY: 4.99,
    FREE_TRIAL_DAYS: 7,

    // Feature flags
    ENABLE_AI_PARSING: true,
    ENABLE_NUTRITION_TRACKING: false, // Premium feature for later
    ENABLE_MEAL_PLANNING: false, // Premium feature for later

    // App metadata
    APP_VERSION: "1.0.0",
    APP_NAME: "SmartList - AI Grocery Planner",
    APP_DESCRIPTION: "Turn recipes into shopping lists instantly with AI",
  },

  // Development vs Production
  IS_DEV: __DEV__,

  // API URLs
  API_URLS: {
    GEMINI_BASE: "https://generativelanguage.googleapis.com/v1beta",
    OPENAI_BASE: "https://api.openai.com/v1",
    STRIPE_BASE: "https://api.stripe.com/v1",
  },
};

// Environment-specific configurations
export const getConfig = () => {
  if (AppConfig.IS_DEV) {
    return {
      ...AppConfig,
      // Development overrides
      APP_SETTINGS: {
        ...AppConfig.APP_SETTINGS,
        FREE_RECIPE_PARSES_PER_MONTH: 100, // More for testing
      },
    };
  }

  return AppConfig;
};

// Helper functions for feature flags
export const isFeatureEnabled = (featureName) => {
  const config = getConfig();
  return config.APP_SETTINGS[featureName] || false;
};

export const getSubscriptionPrice = () => {
  const config = getConfig();
  return config.APP_SETTINGS.PREMIUM_PRICE_MONTHLY;
};

export const getFreeTrialDays = () => {
  const config = getConfig();
  return config.APP_SETTINGS.FREE_TRIAL_DAYS;
};

export default AppConfig;
