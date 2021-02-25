import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';

const SettingScreen = () => {
	const navigation = useNavigation();

	//Should return either Tame animals or Wild animals

	return (
		<View>
			<Text style={{ fontSize: 18, textAlignVertical: "auto", alignSelf: 'center' }}>
                Settings
			</Text>
			<TouchableOpacity
				style={styles.loadingScreen}
				onPress={() => {
					navigation.navigate('Home');
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
        margin:20,
		justifyContent: 'center',
		alignItems: 'center',
		borderColor:"red",
		borderWidth:2
	},
});
