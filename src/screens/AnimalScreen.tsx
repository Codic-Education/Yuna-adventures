import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const AnimalScreen = () => {
	const navigation = useNavigation();

	return (
		<View>
			<Text style={{ fontSize: 18, textAlignVertical: 'center', alignSelf: 'center' }}>
				AnimalScreen, WILD OR TAME ANIMALS
			</Text>
			<TouchableOpacity
				style={styles.loadingScreen}
				onPress={() => {
					navigation.navigate('AnimalSelectorScreen');
				}}
			>
				<Text>Push to go forward </Text>
			</TouchableOpacity>
		</View>
	);
};

export default AnimalScreen;

const styles = StyleSheet.create({
	loadingScreen: {
		marginTop: 50,
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 2,
		borderColor: 'red',
		height: 50,
	},
});
