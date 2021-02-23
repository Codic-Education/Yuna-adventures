import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoadingScreen from './src/screens/LoadingScreen';
import HomeScreen from './src/screens/HomeScreen';
import AnimalScreen from './src/screens/AnimalScreen';
import MainScreen from './src/screens/MainScreen';
import AnimalSelectorScreen from './src/screens/AnimalSelectorScreen';
import AnimalActionScreen from './src/screens/AnimalActionScreen';

const Stack = createStackNavigator();

const HomeStackNavigator = () => {
	return (
		<Stack.Navigator mode="card" screenOptions={{ headerShown: true }}>
			<Stack.Screen name="Home" component={MainScreen} />
			<Stack.Screen name="AnimalNavigator" component={AnimalNavigator}></Stack.Screen>
			{/* <Stack.Screen name="Vehicles" component={VehiclesNavigator}></Stack.Screen> */}
		</Stack.Navigator>
		/* {Object.entries({ ...mainScreens }).map(([name, component]) => (
				<Stack.Screen name={name} component={component} />
			))} */
	);
};

const AnimalNavigator = () => {
	return (
		<Stack.Navigator mode="card" screenOptions={{ headerShown: false }}>
			<Stack.Screen name="AnimalScreen" component={AnimalScreen}></Stack.Screen>
			<Stack.Screen
				name="AnimalSelectorScreen"
				component={AnimalSelectorScreen}
			></Stack.Screen>
			<Stack.Screen name="AnimalActionScreen" component={AnimalActionScreen}></Stack.Screen>
		</Stack.Navigator>
	);
};

//Activate after release 0.3
// const VehiclesNavigator = () => {
// 	return (
// 		<Stack.Navigator>
// 			<Stack.Screen name="CarScreen" component={MainScreen}></Stack.Screen>
// 		</Stack.Navigator>
// 	);
// };
// const mainScreens = {
// 	Home: MainScreen,
// 	AnimalNavigator: AnimalNavigator,
// 	// Vehicles: VehiclesNavigator,
// };

const AppNavigation = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator mode="card" screenOptions={{ headerShown: false }}>
				<Stack.Screen
					name="LoadingScreen"
					component={LoadingScreen}
					options={{ headerShown: true }}
				/>
				<Stack.Screen name="Home" component={HomeStackNavigator} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default AppNavigation;
