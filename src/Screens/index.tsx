import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from './LandingScreen';
import HomeScreen from './HomeScreen';
import SettingsScreen from './SettingsScreen';
import ItemNavigator from './ItemNavigator';

const Stack = createStackNavigator();

const homeStackScreens = {
	HomeScreen,
	SettingsScreen,
	ItemNavigator,
};

const HomeStackNavigator = () => {
	return (
		<Stack.Navigator mode="card" screenOptions={{ headerShown: false }}>
			{Object.entries({ ...homeStackScreens }).map(([name, component]) => (
				<Stack.Screen key={name} name={name} component={component} />
			))}
		</Stack.Navigator>
	);
};

const AppNavigation = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator mode="card" screenOptions={{ headerShown: false }}>
				<Stack.Screen name="LoadingScreen" component={LandingScreen} />
				<Stack.Screen name="HomeStackNavigator" component={HomeStackNavigator} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default AppNavigation;
