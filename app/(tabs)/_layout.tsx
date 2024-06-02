import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Feather from '@expo/vector-icons/Feather';
import {Redirect, Tabs} from 'expo-router';

import Colors from '@/constants/Colors';
import {useColorScheme} from '@/components/useColorScheme';
import {useClientOnlyValue} from '@/components/useClientOnlyValue';

import {Text} from '@/components/Themed';

import {useSession} from '@/hooks/useSession';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const {session, isLoading} = useSession();

  if (isLoading) {
    return null;
  }

  if (!session) {
    return <Redirect href="/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen
        name="map"
        options={{
          headerShown: false,
          title: '',
          tabBarIcon: ({color}) => <FontAwesome size={24} name="map" color={color} />,
        }}
      />
      <Tabs.Screen
        name="createEvent"
        options={{
          headerShown: false,
          title: '',
          tabBarIcon: ({color}) => <FontAwesome6 size={24} name="plus" color={color} />,
        }}
      />
      <Tabs.Screen
        name="chats"
        options={{
          headerShown: false,
          title: '',
          tabBarIcon: ({color}) => <Feather size={24} name="message-circle" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: '',
          tabBarIcon: ({color}) => <FontAwesome5 size={24} name="user" color={color} />,
        }}
      />
    </Tabs>
  );
}
