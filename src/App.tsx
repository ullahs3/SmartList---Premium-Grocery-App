import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Alert, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import components and services
import Icon from './components/Icon';
import { GroceryList, GroceryItem } from './components/StickyNote';
import OverviewScreen from './screens/OverviewScreen';
import ListScreen from './screens/ListScreen';
import RecipeScreen from './screens/RecipeScreen';
import {
  NewListModal,
  ListSelectorModal,
  IngredientReviewModal,
  PremiumModal
} from './components/Modals';
import GeminiService from './services/GeminiService';
import { AppStyles, colors } from './styles/AppStyles';

interface UsageStats {
  isPremium: boolean;
  usesLeft: number;
  totalUses: number;
  maxFreeUses?: number;
}

const STICKY_COLORS = [
  '#FFE066', // Yellow
  '#FF9999', // Pink
  '#99FF99', // Green
  '#99CCFF', // Blue
  '#FFCC99', // Orange
  '#CC99FF', // Purple
  '#99FFFF', // Cyan
  '#FFB3FF', // Magenta
];

const SmartListApp = () => {
  // State management
  const [lists, setLists] = useState<GroceryList[]>([]);
  const [currentList, setCurrentList] = useState<GroceryList | null>(null);
  const [newItem, setNewItem] = useState('');
  const [recipe, setRecipe] = useState('');
  const [showPremium, setShowPremium] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'list' | 'recipe'>('overview');
  const [isPremium, setIsPremium] = useState(false);
  const [showRecipeResults, setShowRecipeResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [parsedIngredients, setParsedIngredients] = useState<GroceryItem[]>([]);
  const [showIngredientReview, setShowIngredientReview] = useState(false);
  const [showNewListModal, setShowNewListModal] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [showListSelector, setShowListSelector] = useState(false);
  const [usageStats, setUsageStats] = useState<UsageStats>({
    isPremium: false,
    usesLeft: 3,
    totalUses: 0,
  });

  // Initialize Gemini service
  const [geminiService] = useState(() => new GeminiService(
    'AIzaSyBr2XI4PGjYwmO9uiwptjTUJdSI1zzmeWs',
    isPremium
  ));

  // Load data on app start
  useEffect(() => {
    loadData();
  }, []);

  // Update Gemini service when premium status changes
  useEffect(() => {
    geminiService.setPremiumStatus(isPremium);
    loadUsageStats();
  }, [isPremium]);

  const loadData = async () => {
    try {
      const savedLists = await AsyncStorage.getItem('grocery_lists');
      if (savedLists) {
        const parsedLists = JSON.parse(savedLists);
        setLists(parsedLists);
        
        const lastActiveId = await AsyncStorage.getItem('last_active_list');
        if (lastActiveId) {
          const lastList = parsedLists.find((list: GroceryList) => list.id === lastActiveId);
          if (lastList) {
            setCurrentList(lastList);
            setActiveTab('list');
          }
        }
      } else {
        createDefaultList();
      }
    } catch (error) {
      console.error('Error loading data:', error);
      createDefaultList();
    }
  };

  const saveData = async (newLists: GroceryList[]) => {
    try {
      await AsyncStorage.setItem('grocery_lists', JSON.stringify(newLists));
      setLists(newLists);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const createDefaultList = () => {
    const defaultList: GroceryList = {
      id: 'default',
      name: 'My Grocery List',
      color: STICKY_COLORS[0],
      createdAt: Date.now(),
      items: [
        { id: 1, name: 'Organic Bananas', completed: false, category: 'Produce' },
        { id: 2, name: 'Greek Yogurt', completed: true, category: 'Dairy' },
        { id: 3, name: 'Whole Grain Bread', completed: false, category: 'Pantry' },
      ]
    };
    
    setLists([defaultList]);
    setCurrentList(defaultList);
    saveData([defaultList]);
  };

  const loadUsageStats = async () => {
    try {
      const stats = await geminiService.getUsageStats();
      setUsageStats(stats);
    } catch (error) {
      console.error('Error loading usage stats:', error);
    }
  };

  // List management
  const createNewList = () => {
    if (!newListName.trim()) {
      Alert.alert('Error', 'Please enter a list name');
      return;
    }

    const newList: GroceryList = {
      id: Date.now().toString(),
      name: newListName.trim(),
      color: STICKY_COLORS[lists.length % STICKY_COLORS.length],
      createdAt: Date.now(),
      items: []
    };

    const updatedLists = [...lists, newList];
    saveData(updatedLists);
    setNewListName('');
    setShowNewListModal(false);
    setCurrentList(newList);
    setActiveTab('list');
  };

  const deleteList = (listId: string) => {
    Alert.alert(
      'Delete List',
      'Are you sure you want to delete this list?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            const updatedLists = lists.filter(list => list.id !== listId);
            saveData(updatedLists);
            
            if (currentList?.id === listId) {
              setCurrentList(updatedLists[0] || null);
              setActiveTab(updatedLists.length > 0 ? 'list' : 'overview');
            }
          }
        }
      ]
    );
  };

  const selectList = (list: GroceryList) => {
    setCurrentList(list);
    AsyncStorage.setItem('last_active_list', list.id);
    setActiveTab('list');
  };

  // Item management
  const addItem = () => {
    if (!newItem.trim() || !currentList) return;

    const newItemObj: GroceryItem = {
      id: Date.now(),
      name: newItem.trim(),
      completed: false,
      category: 'Other',
    };

    const updatedList = {
      ...currentList,
      items: [...currentList.items, newItemObj]
    };

    const updatedLists = lists.map(list => 
      list.id === currentList.id ? updatedList : list
    );

    saveData(updatedLists);
    setCurrentList(updatedList);
    setNewItem('');
  };

  const toggleItem = (id: number) => {
    if (!currentList) return;

    const updatedList = {
      ...currentList,
      items: currentList.items.map(item => 
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    };

    const updatedLists = lists.map(list => 
      list.id === currentList.id ? updatedList : list
    );

    saveData(updatedLists);
    setCurrentList(updatedList);
  };

  const deleteItem = (id: number) => {
    if (!currentList) return;

    const updatedList = {
      ...currentList,
      items: currentList.items.filter(item => item.id !== id)
    };

    const updatedLists = lists.map(list => 
      list.id === currentList.id ? updatedList : list
    );

    saveData(updatedLists);
    setCurrentList(updatedList);
  };

  // Recipe parsing
  const parseRecipe = async () => {
    if (!recipe.trim()) {
      Alert.alert('Error', 'Please enter a recipe to parse');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const ingredients = await geminiService.parseRecipe(recipe);
      setParsedIngredients(ingredients.map(ing => ({ ...ing, completed: true })));
      
      if (lists.length > 1) {
        setShowListSelector(true);
      } else {
        setShowIngredientReview(true);
      }
      
      setRecipe('');
      await loadUsageStats();
      
    } catch (error: any) {
      console.error('Recipe parsing error:', error);
      
      if (error.message.includes('limit reached')) {
        Alert.alert(
          'Upgrade to Premium',
          `${error.message}\n\nUpgrade now for unlimited recipe parsing!`,
          [
            { text: 'Later', style: 'cancel' },
            { text: 'Upgrade', onPress: () => setShowPremium(true) }
          ]
        );
      } else {
        Alert.alert(
          'Parsing Error', 
          'Failed to parse recipe. Please check your internet connection and try again.'
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const toggleIngredientSelection = (id: number) => {
    setParsedIngredients(parsedIngredients.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const addSelectedIngredients = (targetList?: GroceryList) => {
    const listToUpdate = targetList || currentList;
    if (!listToUpdate) return;

    const selectedIngredients = parsedIngredients
      .filter(item => item.completed)
      .map(item => ({ ...item, completed: false }));
    
    const updatedList = {
      ...listToUpdate,
      items: [...listToUpdate.items, ...selectedIngredients]
    };

    const updatedLists = lists.map(list => 
      list.id === listToUpdate.id ? updatedList : list
    );

    saveData(updatedLists);
    
    if (currentList?.id === listToUpdate.id) {
      setCurrentList(updatedList);
    }

    setShowIngredientReview(false);
    setShowListSelector(false);
    setParsedIngredients([]);
    setShowRecipeResults(true);
    
    setTimeout(() => setShowRecipeResults(false), 3000);
    
    Alert.alert(
      'Success!', 
      `Added ${selectedIngredients.length} ingredients to "${listToUpdate.name}"!`
    );
  };

  const cancelIngredientReview = () => {
    setShowIngredientReview(false);
    setShowListSelector(false);
    setParsedIngredients([]);
  };

  const startFreeTrial = async () => {
    setIsPremium(true);
    setShowPremium(false);
    await loadUsageStats();
    Alert.alert('Welcome to Premium!', 'Your 7-day free trial has started!');
  };

  const handleListSelect = (list: GroceryList) => {
    setCurrentList(list);
    setShowListSelector(false);
    setShowIngredientReview(true);
  };

  return (
    <SafeAreaView style={AppStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      
      {/* Header with improved spacing */}
      <View style={[AppStyles.header, { 
        paddingTop: 24, // Extra top padding for breathing room
        paddingBottom: 16 // Slightly more bottom padding
      }]}>
        <View style={AppStyles.headerLeft}>
          {activeTab !== 'overview' && (
            <TouchableOpacity 
              onPress={() => setActiveTab('overview')}
              style={{ marginRight: 8 }}
            >
              <Icon name="back" size={24} color={colors.primary} />
            </TouchableOpacity>
          )}
          <View style={AppStyles.logoIcon}>
            <Icon name="shopping-cart" size={24} color={colors.white} />
          </View>
          <View>
            <Text style={AppStyles.headerTitle}>
              {activeTab === 'overview' ? 'SmartList' : 
               activeTab === 'list' ? currentList?.name : 'Recipe Magic'}
            </Text>
            <Text style={AppStyles.headerSubtitle}>Smart Grocery Planning</Text>
          </View>
        </View>
        {isPremium && (
          <View style={AppStyles.premiumBadge}>
            <Icon name="crown" size={16} color={colors.white} />
            <Text style={AppStyles.premiumText}>Pro</Text>
          </View>
        )}
      </View>

      {/* Screen Content */}
      {activeTab === 'overview' && (
        <OverviewScreen
          lists={lists}
          onCreateNewList={() => setShowNewListModal(true)}
          onSelectList={selectList}
          onDeleteList={deleteList}
          onRecipeMagic={() => setActiveTab('recipe')}
        />
      )}

      {activeTab === 'list' && currentList && (
        <ListScreen
          currentList={currentList}
          newItem={newItem}
          onNewItemChange={setNewItem}
          onAddItem={addItem}
          onToggleItem={toggleItem}
          onDeleteItem={deleteItem}
        />
      )}

      {activeTab === 'recipe' && (
        <RecipeScreen
          recipe={recipe}
          onRecipeChange={setRecipe}
          onParseRecipe={parseRecipe}
          isLoading={isLoading}
          showRecipeResults={showRecipeResults}
          isPremium={isPremium}
          usageStats={usageStats}
          onUpgrade={() => setShowPremium(true)}
        />
      )}

      {/* Modals */}
      <NewListModal
        visible={showNewListModal}
        newListName={newListName}
        onNameChange={setNewListName}
        onCreate={createNewList}
        onCancel={() => setShowNewListModal(false)}
      />

      <ListSelectorModal
        visible={showListSelector}
        lists={lists}
        onSelectList={handleListSelect}
        onCancel={cancelIngredientReview}
      />

      <IngredientReviewModal
        visible={showIngredientReview}
        ingredients={parsedIngredients}
        onToggleIngredient={toggleIngredientSelection}
        onAddSelected={() => addSelectedIngredients()}
        onCancel={cancelIngredientReview}
      />

      <PremiumModal
        visible={showPremium}
        onStartTrial={startFreeTrial}
        onCancel={() => setShowPremium(false)}
      />
    </SafeAreaView>
  );
};

export default SmartListApp;