import React from 'react';
import { View, Text, Dimensions, Alert } from 'react-native';
import IconButton from './inputs/IconButton';
import { createStyle } from '../providers/Theme';
import { useNavigation } from '@react-navigation/native';

const width = Dimensions.get('screen').width;

const NavigationHeader = () => {
	const styles = useStyles();
	const { navigate, goBack } = useNavigation();

	return (
		<View style={styles.navigationContainer}>
			<IconButton iconName="home" onPress={() => navigate('HomeScreen')} />
			<IconButton iconName="arrow-left" onPress={() => goBack()} />
		</View>
	);
};

export default NavigationHeader;

const useStyles = createStyle(({ dimensions: { screenWidth } }) => ({
	navigationContainer: {
		width: screenWidth,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 5,
		paddingHorizontal: 5,
		position: 'absolute',
		top: 0,
		left: 0,
		zIndex: 10,
	},
}));
