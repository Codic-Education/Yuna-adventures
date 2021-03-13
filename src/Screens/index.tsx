import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './SplashScreen';
import HomeScreen from './HomeScreen';
import SettingsScreen from './SettingsScreen';
import ItemNavigator from './ItemNavigator';
//TODO activate backAbility false

const Stack = createStackNavigator();

const homeStackScreens = {
	HomeScreen,
	SettingsScreen,
	ItemNavigator,
};

const HomeStackNavigator = () => {
	return (
		<Stack.Navigator
			mode="card"
			screenOptions={{
				headerShown: false,
			}}
		>
			{Object.entries({ ...homeStackScreens }).map(([name, component]) => (
				<Stack.Screen
					//TODO remove comment to disable ability to go back
					// options={{ gestureEnabled: false }}
					key={name}
					name={name}
					component={component}
				/>
			))}
		</Stack.Navigator>
	);
};

const AppNavigation = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator mode="card" screenOptions={{ headerShown: false }}>
				<Stack.Screen
					//TODO remove comment to disable ability to go back
					// options={{ gestureEnabled: false }}
					name="SplashScreen"
					component={SplashScreen}
				/>
				<Stack.Screen
					//TODO remove comment to disable ability to go back
					// options={{ gestureEnabled: false }}
					name="HomeStackNavigator"
					component={HomeStackNavigator}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default AppNavigation;
