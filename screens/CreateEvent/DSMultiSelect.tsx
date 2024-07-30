import React from 'react';
import {Badge, BadgeText, BadgeIcon, Pressable} from '@gluestack-ui/themed';

type Option = {
  value: string;
  label: string;
  icon?: React.ReactNode;
};
type MultiSelectProps = {
  items: Option[];
  value: string[];
  onChange: (value: string[]) => void;
};

function removeItemAll(arr: string[], value: string): string[] {
  var i = 0;
  while (i < arr.length) {
    if (arr[i] === value) {
      arr.splice(i, 1);
    } else {
      ++i;
    }
  }
  return arr;
}

export const DSMultiSelect = ({items = [], value, onChange}: MultiSelectProps) => {
  return items.map((option: Option) => {
    const hasValue = value.includes(option.value);
    const variant = hasValue ? 'outline' : 'solid';
    const onPress = () => {
      const newValue = hasValue ? value.remove(option.value) : [...value, option.value];
      onChange(newValue);
    };
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
