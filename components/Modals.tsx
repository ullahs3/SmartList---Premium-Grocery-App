import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, ScrollView } from 'react-native';
import Icon from './Icon.js';
import { GroceryList, GroceryItem } from './StickyNote.js';
import { AppStyles, colors } from '../styles/AppStyles.js';

// New List Modal
interface NewListModalProps {
  visible: boolean;
  newListName: string;
  onNameChange: (text: string) => void;
  onCreate: () => void;
  onCancel: () => void;
}

export const NewListModal: React.FC<NewListModalProps> = ({
  visible,
  newListName,
  onNameChange,
  onCreate,
  onCancel
}) => (
  <Modal visible={visible} animationType="slide" transparent>
    <View style={AppStyles.modalOverlay}>
      <View style={[AppStyles.modalContainer, { width: '90%', height: 'auto' }]}>
        <View style={[AppStyles.modalHeader, { justifyContent: 'space-between' }]}>
          <Text style={AppStyles.recipeTitle}>Create New List</Text>
          <TouchableOpacity onPress={onCancel}>
            <Icon name="close" size={24} color={colors.gray[600]} />
          </TouchableOpacity>
        </View>

        <View style={{ padding: 16 }}>
        {/* Use the same container as Add Item */}
        <View style={AppStyles.addItemContainer}>
            <TextInput
            style={AppStyles.addItemInput}
            placeholder="Enter list name..."
            placeholderTextColor={colors.gray[500]}
            value={newListName}
            onChangeText={onNameChange}
            autoFocus
            onSubmitEditing={onCreate}
            returnKeyType="done"
            />
        </View>
        
        <View style={{ flexDirection: 'row', gap: 12, marginTop: 16 }}>
            <TouchableOpacity 
            style={[AppStyles.primaryButton, { flex: 1 }]}
            onPress={onCreate}
            >
            <Text style={AppStyles.primaryButtonText}>Create List</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
            style={[AppStyles.secondaryButton, { flex: 1 }]}
            onPress={onCancel}
            >
            <Text style={AppStyles.secondaryButtonText}>Cancel</Text>
            </TouchableOpacity>
        </View>
        </View>
      </View>
    </View>
  </Modal>
);

// List Selector Modal
interface ListSelectorModalProps {
  visible: boolean;
  lists: GroceryList[];
  onSelectList: (list: GroceryList) => void;
  onCancel: () => void;
}

export const ListSelectorModal: React.FC<ListSelectorModalProps> = ({
  visible,
  lists,
  onSelectList,
  onCancel
}) => (
  <Modal visible={visible} animationType="slide" transparent>
    <View style={AppStyles.modalOverlay}>
      <View style={[AppStyles.modalContainer, { width: '90%', height: 'auto' }]}>
        <View style={[AppStyles.modalHeader, { justifyContent: 'space-between' }]}>
          <Text style={AppStyles.recipeTitle}>Choose List</Text>
          <TouchableOpacity onPress={onCancel}>
            <Icon name="close" size={24} color={colors.gray[600]} />
          </TouchableOpacity>
        </View>

        <View style={{ padding: 16 }}>
          <Text style={AppStyles.recipeDescription}>
            Which list would you like to add the ingredients to?
          </Text>
          
          {lists.map((list) => (
            <TouchableOpacity
              key={list.id}
              style={{
                backgroundColor: list.color,
                borderRadius: 12,
                padding: 16,
                marginBottom: 12,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
              onPress={() => onSelectList(list)}
            >
              <View>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#333' }}>
                  {list.name}
                </Text>
                <Text style={{ fontSize: 12, color: '#666' }}>
                  {list.items.length} items
                </Text>
              </View>
              <Icon name="plus" size={20} color="#333" />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  </Modal>
);

// Ingredient Review Modal
interface IngredientReviewModalProps {
  visible: boolean;
  ingredients: GroceryItem[];
  onToggleIngredient: (id: number) => void;
  onAddSelected: () => void;
  onCancel: () => void;
}

export const IngredientReviewModal: React.FC<IngredientReviewModalProps> = ({
  visible,
  ingredients,
  onToggleIngredient,
  onAddSelected,
  onCancel
}) => (
  <Modal visible={visible} animationType="slide" transparent>
    <View style={AppStyles.modalOverlay}>
      <View style={[AppStyles.modalContainer, { height: '85%', width: '95%' }]}>
        <View style={[AppStyles.modalHeader, { justifyContent: 'space-between', alignItems: 'center' }]}>
          <Text style={AppStyles.recipeTitle}>Review Ingredients</Text>
          <TouchableOpacity onPress={onCancel}>
            <Icon name="close" size={24} color={colors.gray[600]} />
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1, paddingHorizontal: 16 }}>
          <Text style={[AppStyles.recipeDescription, { marginBottom: 16 }]}>
            Select the ingredients you need to buy. Uncheck items you already have at home.
          </Text>

          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={true}>
            {ingredients.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  {
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 16,
                    borderBottomWidth: 1,
                    borderBottomColor: colors.gray[100],
                    gap: 12,
                  },
                  !item.completed && { opacity: 0.5 }
                ]}
                onPress={() => onToggleIngredient(item.id)}
              >
                <View
                  style={[
                    {
                      width: 24,
                      height: 24,
                      borderWidth: 2,
                      borderColor: item.completed ? colors.success : colors.gray[300],
                      borderRadius: 12,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: item.completed ? colors.success : 'transparent',
                    }
                  ]}
                >
                  {item.completed && <Icon name="check" size={16} color={colors.white} />}
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[
                    {
                      fontSize: 16,
                      fontWeight: '500',
                      color: item.completed ? colors.gray[900] : colors.gray[400]
                    }
                  ]}>
                    {item.name}
                  </Text>
                  <Text style={{
                    fontSize: 12,
                    color: colors.gray[500],
                    marginTop: 2
                  }}>
                    {item.category}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={{ padding: 16, gap: 12, backgroundColor: colors.white }}>
            <TouchableOpacity 
              style={{
                backgroundColor: colors.primary,
                borderRadius: 12,
                padding: 16,
                alignItems: 'center',
              }}
              onPress={onAddSelected}
            >
              <Text style={{
                color: colors.white,
                fontSize: 16,
                fontWeight: '600'
              }}>
                Add {ingredients.filter(item => item.completed).length} Selected Items
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={{
                backgroundColor: colors.gray[100],
                borderRadius: 12,
                padding: 16,
                alignItems: 'center',
              }}
              onPress={onCancel}
            >
              <Text style={{
                color: colors.gray[700],
                fontSize: 16,
                fontWeight: '600'
              }}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  </Modal>
);

// Premium Modal
interface PremiumModalProps {
  visible: boolean;
  onStartTrial: () => void;
  onCancel: () => void;
}

export const PremiumModal: React.FC<PremiumModalProps> = ({
  visible,
  onStartTrial,
  onCancel
}) => (
  <Modal visible={visible} animationType="slide" transparent>
    <View style={AppStyles.modalOverlay}>
      <View style={AppStyles.modalContainer}>
        <View style={AppStyles.modalHeader}>
          <TouchableOpacity onPress={onCancel}>
            <Icon name="close" size={24} color={colors.gray[600]} />
          </TouchableOpacity>
        </View>

        <View style={AppStyles.premiumContent}>
          <View style={AppStyles.premiumIcon}>
            <Icon name="crown" size={48} color={colors.white} />
          </View>
          <Text style={AppStyles.premiumTitle}>Go Premium!</Text>
          <Text style={AppStyles.premiumSubtitle}>
            Unlock all features for the ultimate shopping experience
          </Text>

          <View style={AppStyles.premiumFeatures}>
            {[
              'Unlimited AI Recipe Analysis',
              'Advanced Meal Planning Calendar',
              'Nutrition Tracking & Health Goals',
              'Price Comparison & Store Alerts',
              'Cloud Sync Across All Devices'
            ].map((feature, index) => (
              <View key={index} style={AppStyles.premiumFeature}>
                <Icon name="checkmark-circle" size={20} color={colors.success} />
                <Text style={AppStyles.premiumFeatureText}>{feature}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity style={AppStyles.freeTrialButton} onPress={onStartTrial}>
            <Text style={AppStyles.freeTrialButtonText}>Start 7-Day Free Trial</Text>
          </TouchableOpacity>
          <Text style={AppStyles.pricingText}>Then $4.99/month • Cancel anytime</Text>
        </View>
      </View>
    </View>
  </Modal>
);