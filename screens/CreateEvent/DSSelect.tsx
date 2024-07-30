import React from 'react';
import {Badge, BadgeText, BadgeIcon, Pressable} from '@gluestack-ui/themed';

type Option = {
  value: string;
  label: string;
  icon?: React.ReactNode;
};
type SelectProps = {
  items: Option[];
  value: String;
  onChange: (value: string) => void;
};

export const DSSelect = ({items = [], value, onChange}: SelectProps) => {
  return items.map((option: Option) => {
    const isActive = option?.value === value;
    const variant = isActive ? 'outline' : 'solid';
    const onPress = () => onChange(option.value);
    return (
      <Pressable onPress={onPress}>
        <Badge variant={variant} mt="$2" mr="$2" size="lg" borderRadius="$lg" action="info">
          {option?.label ? <BadgeText>{option.label}</BadgeText> : null}
          {option?.icon ? <BadgeIcon as={option.icon} ml="$2" /> : null}
        </Badge>
      </Pressable>
    );
  });
};
