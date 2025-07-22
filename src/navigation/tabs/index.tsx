import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';

import TabBarIcon from './TabBarIcon';

import HomeScreen from '@/screens/home';

const Tab = createBottomTabNavigator();

const DummyScreen = ({ label }: { label: string }) => (
  <View className="flex-1 items-center justify-center bg-white">
    <Text>{label} Screen</Text>
  </View>
);

const BottomTabBar = () => {
  return (
    <Tab.Navigator
      id={undefined}
      initialRouteName="HomeScreen"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused }) => (
          <TabBarIcon routeName={route.name} focused={focused} />
        ),
        tabBarStyle: {
          paddingTop: 6,
          paddingHorizontal: 4,
        },
      })}>
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="QRScreen" children={() => <DummyScreen label="QR" />} />
      <Tab.Screen
        name="BookScreen"
        children={() => <DummyScreen label="Book" />}
      />
      <Tab.Screen name="MyScreen" children={() => <DummyScreen label="My" />} />
    </Tab.Navigator>
  );
};

export default BottomTabBar;
