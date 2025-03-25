import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { RouteName } from './routes/RouteName';
import FAQScreen from './screens/FAQScreen';
import HomeScreen from './screens/HomeScreen';
import ScheduleScreen from './screens/ScheduleScreen';
import SplashScreen from './screens/SplashScreen';
import UserDetailsScreen from './screens/UserDetailsScreen';

export type MainNaivgatorType = {
  SplashScreen: undefined | any;
  UserDetailsScreen: undefined | any;
  HomeScreen: {name: string; contactInfo: string | number} | any;
  ScheduleScreen: undefined | any;
  FAQScreen: undefined | any;
};

const Stack = createNativeStackNavigator<MainNaivgatorType>();

const MainNaivgator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={RouteName.SplashScreen} component={SplashScreen} />
        <Stack.Screen
          name={RouteName.UserDetailsScreen}
          component={UserDetailsScreen}
        />
        <Stack.Screen name={RouteName.HomeScreen} component={HomeScreen} />
        <Stack.Screen
          name={RouteName.ScheduleScreen}
          component={ScheduleScreen}
        />
        <Stack.Screen name={RouteName.FAQScreen} component={FAQScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNaivgator;
