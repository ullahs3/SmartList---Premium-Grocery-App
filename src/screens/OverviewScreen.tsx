import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Icon from '../components/Icon';
import StickyNote, { GroceryList } from '../components/StickyNote';
import { AppStyles, colors } from '../styles/AppStyles';

interface OverviewScreenProps {
  lists: GroceryList[];
  onCreateNewList: () => void;
  onSelectList: (list: GroceryList) => void;
  onDeleteList: (listId: string) => void;
  onRecipeMagic: () => void;
}

const OverviewScreen: React.FC<OverviewScreenProps> = ({
  lists,
  onCreateNewList,
  onSelectList,
  onDeleteList,
  onRecipeMagic
}) => {
  return (
    <ScrollView style={AppStyles.content}>
      <View style={{ padding: 16 }}>
        <View style={{ 
          flexDirection: 'row', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: 16 
        }}>
          <Text style={[AppStyles.headerTitle, { fontSize: 24 }]}>Your Lists</Text>
          <TouchableOpacity
            onPress={onCreateNewList}
            style={{
              backgroundColor: colors.primary,
              borderRadius: 20,
              width: 40,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Icon name="plus" size={20} color={colors.white} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={onRecipeMagic}
          style={{
            backgroundColor: colors.secondary,
            borderRadius: 16,
            padding: 20,
            marginBottom: 24,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12
          }}
        >
          <Icon name="sparkles" size={32} color={colors.white} />
          <View style={{ flex: 1 }}>
            <Text style={{ color: colors.white, fontSize: 18, fontWeight: 'bold' }}>
              Recipe Magic
            </Text>
            <Text style={{ color: colors.white, opacity: 0.9, fontSize: 14 }}>
              Turn any recipe into a shopping list instantly
            </Text>
          </View>
        </TouchableOpacity>

        {/* Sticky Notes Grid */}
        <View style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 12,
          justifyContent: 'space-between'
        }}>
          {lists.map((list) => (
            <StickyNote
              key={list.id}
              list={list}
              onSelect={onSelectList}
              onDelete={onDeleteList}
              canDelete={lists.length > 1}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default OverviewScreen;