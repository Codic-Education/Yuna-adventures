import React from 'react';
import { Text } from 'react-native';
import Button from '../components/inputs/Button';
import { ScreenProps } from '../constants/globalTypes';
//TODO: create & use data provide instead.
import animals from '../data/categories/animals';
import vehicles from '../data/categories/vehicles';
const categories = {
	animals,
	vehicles,
};

const ItemSelectorScreen = ({ route: { params }, navigation }: ScreenProps) => {
	const items = Object.keys(categories[params.category]);

	return (
		<>
			<Text style={{ fontSize: 18, textAlignVertical: 'auto', alignSelf: 'center' }}>
				{`${params.category} item selector`}
			</Text>
			{items.map((name) => (
				<Button
					key={name}
					style={{ padding: 20, marginBottom: 10, borderWidth: 3, borderColor: 'red' }}
					onPress={() => {
						navigation.navigate('ItemScreen', { itemName: name });
					}}
				>
					{name}
				</Button>
			))}
		</>
	);
};

export default ItemSelectorScreen;
