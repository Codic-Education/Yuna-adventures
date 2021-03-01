import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { ScreenProps } from '../constants/globalTypes';

const LoadingScreen = ({ navigation }: ScreenProps) => {
	return (
		<View>
			<TouchableOpacity
				style={styles.loadingScreen}
				onPress={() => navigation.navigate('HomeStackNavigator')}
			>
				<Text style={{ fontSize: 48 }}>LoadingScreen</Text>
				{/* <Text style={{ flex:1, color: 'red' }}>Click here</Text> */}
			</TouchableOpacity>
		</View>
	);
};

export default LoadingScreen;

const styles = StyleSheet.create({
	loadingScreen: {
		top: 100,
		left: 100,
		borderColor: 'red',
		borderWidth: 2,
	},
});
