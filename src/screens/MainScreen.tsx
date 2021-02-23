import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const MainScreen = () => {
	const navigation = useNavigation();
	return (
		<View>
				<Text style={{ fontSize: 18, textAlignVertical: "auto", alignSelf: 'center' }}>
				ANIMALS OR CARS
			</Text>
			<TouchableOpacity
				style={styles.loadingScreen}
				onPress={() => navigation.navigate('AnimalNavigator')}
			>
				<Text>MainScreen</Text>
			</TouchableOpacity>
		</View>
	);
};

export default MainScreen;

const styles = StyleSheet.create({
	loadingScreen: {
		borderColor:"red",
		borderWidth:2,
		marginTop: 50,
		height:48,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
