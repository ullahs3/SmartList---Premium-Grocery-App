import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from './Icon';
import { colors } from '../styles/AppStyles';

export interface GroceryList {
  id: string;
  name: string;
  items: GroceryItem[];
  color: string;
  createdAt: number;
}

export interface GroceryItem {
  id: number;
  name: string;
  completed: boolean;
  category: string;
  fromRecipe?: boolean;
}

interface StickyNoteProps {
  list: GroceryList;
  onSelect: (list: GroceryList) => void;
  onDelete: (listId: string) => void;
  canDelete: boolean;
}

const StickyNote: React.FC<StickyNoteProps> = ({ list, onSelect, onDelete, canDelete }) => {
  const getListProgress = (list: GroceryList) => {
    if (list.items.length === 0) return 0;
    const completed = list.items.filter(item => item.completed).length;
    return Math.round((completed / list.items.length) * 100);
  };

  return (
    <TouchableOpacity
      onPress={() => onSelect(list)}
      style={{
        backgroundColor: list.color,
        borderRadius: 12,
        padding: 16,
        width: '48%',
        minHeight: 150,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        position: 'relative'
      }}
    >
      {canDelete && (
        <TouchableOpacity
          onPress={() => onDelete(list.id)}
          style={{
            position: 'absolute',
            top: 8,
            right: 8,
            padding: 4
          }}
        >
          <Icon name="trash" size={16} color="#666" />
        </TouchableOpacity>
      )}
      
      <Text style={{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
        paddingRight: 24
      }}>
        {list.name}
      </Text>
      
      <Text style={{
        fontSize: 12,
        color: '#666',
        marginBottom: 12
      }}>
        {list.items.length} items
      </Text>

      {list.items.length > 0 && (
        <>
          <View style={{
            backgroundColor: 'rgba(255,255,255,0.5)',
            borderRadius: 6,
            height: 6,
            marginBottom: 8
          }}>
            <View style={{
              backgroundColor: colors.success,
              borderRadius: 6,
              height: 6,
              width: `${getListProgress(list)}%`
            }} />
          </View>
          
          <Text style={{
            fontSize: 11,
            color: '#666',
            marginBottom: 8
          }}>
            {getListProgress(list)}% complete
          </Text>

          <Text style={{
            fontSize: 12,
            color: '#555',
            opacity: 0.8,
            fontStyle: 'italic'
          }}>
            {list.items.slice(0, 3).map(item => item.name).join(', ')}
            {list.items.length > 3 && '...'}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

export default StickyNote;