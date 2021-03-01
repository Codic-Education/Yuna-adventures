import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { ScreenProps } from '../constants/globalTypes';

const SettingScreen = ({ navigation }: ScreenProps) => {
	return (
		<View>
			<Text style={{ fontSize: 18, textAlignVertical: 'auto', alignSelf: 'center' }}>
				Settings
			</Text>
			<TouchableOpacity
				style={styles.loadingScreen}
				onPress={() => {
					navigation.navigate('HomeScreen');
				}}
			>
				<Text>Home</Text>
			</TouchableOpacity>
		</View>
	);
};

export default SettingScreen;

const styles = StyleSheet.create({
	loadingScreen: {
		margin: 20,
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: 'red',
		borderWidth: 2,
	},
});
