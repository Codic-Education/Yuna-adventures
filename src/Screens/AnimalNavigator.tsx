import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AnimalActionScreen from './Animals/AnimalActionScreen';
import AnimalScreen from './Animals/AnimalScreen';
import AnimalSelectorScreen from './Animals/AnimalSelectorScreen';

const Stack = createStackNavigator();

//Add name and component to animalScreen Object to add new screens.
const animalScreens = {
	AnimalScreen,
	AnimalSelectorScreen,
	AnimalActionScreen,
};

const AnimalNavigator = () => {
	return (
		<Stack.Navigator mode="card" screenOptions={{ headerShown: false }}>
			{Object.entries({ ...animalScreens }).map(([name, component]) => (
				<Stack.Screen key={name} name={name} component={component} />
			))}
		</Stack.Navigator>
	);
};

export default AnimalNavigator;


