import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ItemScreen from './ItemScreen';
import ItemSelectorScreen from './ItemSelectorScreen';

const Stack = createStackNavigator();

const animalScreens = {
	ItemSelectorScreen,
	ItemScreen,
};

const ItemNavigator = () => {
	return (
		<Stack.Navigator mode="card" screenOptions={{ headerShown: false }}>
			{Object.entries({ ...animalScreens }).map(([name, component]) => (
				<Stack.Screen key={name} name={name} component={component} />
			))}
		</Stack.Navigator>
	);
};

export default ItemNavigator;
