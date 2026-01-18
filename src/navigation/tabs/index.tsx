import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';

import TabBarIcon from './TabBarIcon';

import HomeScreen from '@/screens/home';
import PicselTabScreen from '@/screens/picsel';

const Tab = createBottomTabNavigator();

const DummyScreen = ({ label }: { label: string }) => (
  <View className="flex-1 items-center justify-center bg-white">
    <Text>{label} Screen</Text>
  </View>
);

const EmptyScreen = () => <></>;

const renderTabBarIcon =
  (routeName: string) =>
  ({ focused }: { focused: boolean }) => (
    <TabBarIcon routeName={routeName} focused={focused} />
  );

const handleQrTabPress = (navigation: any) => (e: any) => {
  // 생산성을 위한 임시 any 허용
  e.preventDefault();
  navigation.navigate('QrScan');
};

const BottomTabBar = () => {
  return (
    <Tab.Navigator
      id={undefined}
      initialRouteName="HomeScreen"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: renderTabBarIcon(route.name),
        tabBarStyle: {
          paddingTop: 6,
          paddingHorizontal: 4,
        },
      })}>
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen
        name="QRScreen"
        component={EmptyScreen}
        listeners={({ navigation }) => ({
          tabPress: handleQrTabPress(navigation),
        })}
        options={{
          tabBarIcon: renderTabBarIcon('QRScreen'),
        }}
      />
      <Tab.Screen name="BookScreen" component={PicselTabScreen} />
      <Tab.Screen name="MyScreen" children={() => <DummyScreen label="My" />} />
    </Tab.Navigator>
  );
};

export default BottomTabBar;
