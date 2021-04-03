import React, { useRef, useState } from 'react';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './SplashScreen';
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
		<Stack.Navigator
			mode="card"
			screenOptions={{
				headerShown: false,
			}}
		>
			{Object.entries({ ...homeStackScreens }).map(([name, component]) => (
				<Stack.Screen key={name} name={name} component={component} />
			))}
		</Stack.Navigator>
	);
};

const AppNavigation = () => {
	const navigationRef = useRef<NavigationContainerRef>(null);
	const [hasSplashScreenSwitched, setHasSplashScreenSwitched] = useState(false);

	return (
		<NavigationContainer
			ref={navigationRef}
			onStateChange={async () => {
				if (
					!hasSplashScreenSwitched &&
					navigationRef.current?.getCurrentRoute()?.name === 'HomeScreen'
				) {
					setHasSplashScreenSwitched(true);
				}
			}}
		>
			<Stack.Navigator mode="card" screenOptions={{ headerShown: false }}>
				{!hasSplashScreenSwitched && (
					<Stack.Screen name="SplashScreen" component={SplashScreen} />
				)}
				<Stack.Screen
					name="HomeStackNavigator"
					component={HomeStackNavigator}
					options={{ animationEnabled: false }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default AppNavigation;
