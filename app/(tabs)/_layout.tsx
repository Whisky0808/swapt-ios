import { Tabs } from 'expo-router';
import React from 'react';

import {TabBarIcon}  from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { AvatarProvider } from '@/components/AvatarProvider';


export default function TabLayout() {
  const colorScheme = useColorScheme();



  return (
    <AvatarProvider>

    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Orders',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'grid' : 'grid-outline'} color={color} style={undefined} />
          ),
        }}
      />
      <Tabs.Screen
        name="inventory"
        options={{
          title: 'Inventory',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'storefront' : 'storefront-outline'} color={color} style={undefined} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Event',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'planet' : 'planet-outline'} color={color} style={undefined} />
          ),
        }}
      />
    </Tabs>
    
    </AvatarProvider>
  );
}
