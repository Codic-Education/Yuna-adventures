import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const AnimalActionScreen = () => {
	const navigation = useNavigation();

	return (
		<View>
			<Text style={{alignSelf:"center", fontSize:18}}>HERE IS THE LAST SCENE WHERE ITEMS WILL RENDER</Text>
			<TouchableOpacity
				style={styles.loadingScreen}
				onPress={() => {
					navigation.navigate('AnimalSelectorScreen');
				}}
			>
				<Text>AnimalSelectorScreen</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.loadingScreen}
				onPress={() => {
					navigation.navigate('Home');
				}}
			>
				<Text>HomeScreen</Text>
			</TouchableOpacity>
		</View>
	);
};

export default AnimalActionScreen;

const styles = StyleSheet.create({
	loadingScreen: {
        margin:20,
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth:2,
		borderColor:"red"
	},
});
