import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { ScreenProps } from '../constants/globalTypes';

const ItemScreen = ({ route: { params }, navigation }: ScreenProps) => {
	return (
		<View>
			<Text
				style={{
					marginTop: 20,
					textAlign: 'center',
				}}
			>{`${params.itemName} item`}</Text>
			<TouchableOpacity
				style={styles.loadingScreen}
				onPress={() => {
					navigation.navigate('ItemSelectorScreen');
				}}
			>
				<Text>AnimalSelectorScreen</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.loadingScreen}
				onPress={() => {
					navigation.navigate('HomeScreen');
				}}
			>
				<Text>HomeScreen</Text>
			</TouchableOpacity>
		</View>
	);
};

export default ItemScreen;

const styles = StyleSheet.create({
	loadingScreen: {
		margin: 20,
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 2,
		borderColor: 'red',
	},
});
