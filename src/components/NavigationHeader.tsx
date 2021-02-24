import React from 'react';
import { View, Text, Dimensions, Alert } from 'react-native';
import SvgButton from './inputs/SvgButton';
import { createStyle } from '../providers/Theme';

const width = Dimensions.get('screen').width;

const NavigationHeader = () => {
	const styles = useStyles();

	return (
		<View style={styles.navigationContainer}>
			<SvgButton iconName="home" onPress={() => Alert.alert('You clicked')} />
			<SvgButton iconName="arrow-left" />
		</View>
	);
};

export default NavigationHeader;

const useStyles = createStyle({
	navigationContainer: {
		width: width,
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
});
