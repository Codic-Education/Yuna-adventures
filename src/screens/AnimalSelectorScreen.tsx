import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const AnimalSelectorScreen = () => {
	const navigation = useNavigation();

	//Should return either Tame animals or Wild animals

	return (
		<View>
			<Text style={{ fontSize: 18, textAlignVertical: "auto", alignSelf: 'center' }}>
				Here you choose between animals
			</Text>
			<TouchableOpacity
				style={styles.loadingScreen}
				onPress={() => {
					navigation.navigate('AnimalActionScreen');
				}}
			>
				<Text>Push to go forward</Text>
			</TouchableOpacity>
		</View>
	);
};

export default AnimalSelectorScreen;

const styles = StyleSheet.create({
	loadingScreen: {
        margin:20,
		justifyContent: 'center',
		alignItems: 'center',
		borderColor:"red",
		borderWidth:2
	},
});
