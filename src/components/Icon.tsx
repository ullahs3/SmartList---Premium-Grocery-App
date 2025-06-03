import React from 'react';
import { Text } from 'react-native';

interface IconProps {
  name: string;
  size?: number;
  color?: string;
}

const Icon: React.FC<IconProps> = ({ name, size = 24, color = '#000' }) => {
  const iconMap: { [key: string]: string } = {
    'shopping-cart': '🛒',
    'plus': '+',
    'check': '✓',
    'x': '×',
    'crown': '👑',
    'sparkles': '✨',
    'chef-hat': '👨‍🍳',
    'star': '⭐',
    'calendar': '📅',
    'fitness': '💪',
    'checkmark-circle': '✅',
    'close': '×',
    'list': '📋',
    'restaurant': '🍽️',
    'edit': '✏️',
    'trash': '🗑️',
    'back': '←',
  };
  
  return (
    <Text style={{ fontSize: size, color: color }}>
      {iconMap[name] || '●'}
    </Text>
  );
};

export default Icon;