import React from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import Icon from '../components/Icon';
import { GroceryList, GroceryItem } from '../components/StickyNote';
import { AppStyles, colors } from '../styles/AppStyles';

interface ListScreenProps {
  currentList: GroceryList;
  newItem: string;
  onNewItemChange: (text: string) => void;
  onAddItem: () => void;
  onToggleItem: (id: number) => void;
  onDeleteItem: (id: number) => void;
}

const ListScreen: React.FC<ListScreenProps> = ({
  currentList,
  newItem,
  onNewItemChange,
  onAddItem,
  onToggleItem,
  onDeleteItem
}) => {
  const getListProgress = (list: GroceryList) => {
    if (list.items.length === 0) return 0;
    const completed = list.items.filter(item => item.completed).length;
    return Math.round((completed / list.items.length) * 100);
  };

  return (
    <ScrollView style={AppStyles.content}>
      {/* Progress Bar */}
      <View style={AppStyles.progressContainer}>
        <View style={AppStyles.progressHeader}>
          <Text style={AppStyles.progressText}>Progress</Text>
          <Text style={AppStyles.progressCount}>
            {currentList.items.filter(item => item.completed).length}/{currentList.items.length}
          </Text>
        </View>
        <View style={AppStyles.progressBarContainer}>
          <View 
            style={[
              AppStyles.progressBar, 
              { width: `${getListProgress(currentList)}%` }
            ]} 
          />
        </View>
      </View>

      {/* Add Item */}
      <View style={AppStyles.addItemContainer}>
        <TextInput
          style={AppStyles.addItemInput}
          placeholder="Add item to your list..."
          value={newItem}
          onChangeText={onNewItemChange}
          onSubmitEditing={onAddItem}
          returnKeyType="done"
        />
        <TouchableOpacity style={AppStyles.addButton} onPress={onAddItem}>
          <Icon name="plus" size={24} color={colors.white} />
        </TouchableOpacity>
      </View>

      {/* Items List */}
      <FlatList
        data={currentList.items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={AppStyles.listItem}>
            <TouchableOpacity
              style={[AppStyles.checkbox, item.completed && AppStyles.checkedBox]}
              onPress={() => onToggleItem(item.id)}
            >
              {item.completed && <Icon name="check" size={16} color={colors.white} />}
            </TouchableOpacity>
            <View style={AppStyles.itemContent}>
              <Text style={[AppStyles.itemName, item.completed && AppStyles.completedItem]}>
                {item.name}
              </Text>
              <Text style={AppStyles.itemCategory}>
                {item.category}{item.fromRecipe ? ' • From Recipe' : ''}
              </Text>
            </View>
            <TouchableOpacity onPress={() => onDeleteItem(item.id)}>
              <Icon name="close" size={20} color={colors.gray[600]} />
            </TouchableOpacity>
          </View>
        )}
        scrollEnabled={false}
      />
    </ScrollView>
  );
};

export default ListScreen;