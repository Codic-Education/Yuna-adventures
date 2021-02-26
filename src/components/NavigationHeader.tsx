import React from 'react';
import { View, Text, Dimensions, Alert } from 'react-native';
import IconButton from './inputs/IconButton';
import { createStyle } from '../providers/Theme';

const width = Dimensions.get('screen').width;

const NavigationHeader = () => {
	const styles = useStyles();

	return (
		<View style={styles.navigationContainer}>
			<IconButton iconName="home" onPress={() => Alert.alert('You clicked')} />
			<IconButton iconName="arrow-left" onPress={() => Alert.alert('You clicked')} />
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
		paddingVertical: 20,
		paddingHorizontal: 30,
		position: 'absolute',
		top: 0,
		left: 0,
		zIndex: 10,
	},
}));
