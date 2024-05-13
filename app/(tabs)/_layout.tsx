import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import {Link, Tabs} from 'expo-router';
import {Pressable} from 'react-native';

import Colors from '@/constants/Colors';
import {useColorScheme} from '@/components/useColorScheme';
import {useClientOnlyValue} from '@/components/useClientOnlyValue';

function TabBarIcon(props: {name: React.ComponentProps<typeof FontAwesome>['name']; color: string}) {
  return <FontAwesome size={24} style={{marginBottom: -3}} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen
        name="map"
        options={{
          headerShown: false,
          title: '',
          tabBarIcon: ({color}) => <FontAwesome size={24} name="map" color={color} />,
          // headerRight: () => (
          //   <Link href="/modal" asChild>
          //     <Pressable>
          //       {({pressed}) => (
          //         <FontAwesome
          //           name="info-circle"
          //           size={25}
          //           color={Colors[colorScheme ?? 'light'].text}
          //           style={{marginRight: 15, opacity: pressed ? 0.5 : 1}}
          //         />
          //       )}
          //     </Pressable>
          //   </Link>
          // ),
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
