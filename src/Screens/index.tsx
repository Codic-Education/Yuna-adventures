// import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoadingScreen from './LoadingScreen';
import HomeScreen from './HomeScreen';
import SettingScreen from './SettingScreen';
import AnimalNavigator from './AnimalNavigator';

const Stack = createStackNavigator();

//To Add more screens to HomeStackNavigator (global screens) add name and component in homeStackScreens
const homeStackScreens = {
	Home: HomeScreen,
	SettingScreen,
	AnimalNavigator,
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
				<Stack.Screen name="LoadingScreen" component={LoadingScreen} />
				<Stack.Screen name="HomeStackNavigator" component={HomeStackNavigator} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default AppNavigation;



//Activate after release 0.3
// const VehiclesNavigator = () => {
// 	return (
// 		<Stack.Navigator>
// 			<Stack.Screen name="CarScreen" component={MainScreen}></Stack.Screen>
// 		</Stack.Navigator>
// 	);
// };

