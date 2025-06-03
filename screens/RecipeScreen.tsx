import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import Icon from '../components/Icon';
import { AppStyles, colors } from '../styles/AppStyles';

interface UsageStats {
  isPremium: boolean;
  usesLeft: number;
  totalUses: number;
  maxFreeUses?: number;
}

interface RecipeScreenProps {
  recipe: string;
  onRecipeChange: (text: string) => void;
  onParseRecipe: () => void;
  isLoading: boolean;
  showRecipeResults: boolean;
  isPremium: boolean;
  usageStats: UsageStats;
  onUpgrade: () => void;
}

const RecipeScreen: React.FC<RecipeScreenProps> = ({
  recipe,
  onRecipeChange,
  onParseRecipe,
  isLoading,
  showRecipeResults,
  isPremium,
  usageStats,
  onUpgrade
}) => {
  return (
    <ScrollView style={AppStyles.content}>
      <View style={AppStyles.recipeContainer}>
        {!isPremium && (
          <View style={AppStyles.usageStats}>
            <Text style={AppStyles.usageStatsText}>
              Free Recipe Parses: {usageStats.usesLeft} remaining
            </Text>
          </View>
        )}

        <View style={AppStyles.recipeHeader}>
          <Icon name="sparkles" size={24} color={colors.secondary} />
          <Text style={AppStyles.recipeTitle}>Recipe to List Magic</Text>
        </View>
        <Text style={AppStyles.recipeDescription}>
          Paste any recipe and we'll automatically create your shopping list!
        </Text>

        <TextInput
          style={AppStyles.recipeInput}
          placeholder="Try: 'Grilled chicken with herbs: 2 lbs chicken breast, olive oil, garlic, thyme'"
          value={recipe}
          onChangeText={onRecipeChange}
          multiline
          textAlignVertical="top"
        />

        <TouchableOpacity 
          style={[AppStyles.magicButton, isLoading && { opacity: 0.7 }]} 
          onPress={onParseRecipe}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color={colors.white} />
          ) : (
            <Icon name="sparkles" size={20} color={colors.white} />
          )}
          <Text style={AppStyles.magicButtonText}>
            {isLoading ? 'Parsing Recipe...' : '✨ Create Shopping List'}
          </Text>
        </TouchableOpacity>

        {showRecipeResults && (
          <View style={AppStyles.successMessage}>
            <Icon name="checkmark-circle" size={20} color={colors.success} />
            <Text style={AppStyles.successText}>Ingredients added to your list!</Text>
          </View>
        )}

        {!isPremium && (
          <View style={AppStyles.premiumTeaser}>
            <View style={AppStyles.premiumHeader}>
              <Icon name="crown" size={20} color={colors.warning} />
              <Text style={AppStyles.premiumTeaserTitle}>Go Premium</Text>
            </View>

            <View style={AppStyles.featureList}>
              <Text style={AppStyles.premiumTeaserTitle}>Unlock Unlimited Recipe Magic</Text>
              <Text style={[AppStyles.featureText, { textAlign: 'center', marginVertical: 16 }]}>
                Parse unlimited recipes into shopping lists with our AI-powered Recipe Magic feature.
              </Text>
            </View>
            <TouchableOpacity
              style={AppStyles.upgradeButton}
              onPress={onUpgrade}
            >
              <Text style={AppStyles.upgradeButtonText}>Upgrade to Pro</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default RecipeScreen;