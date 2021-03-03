import React from 'react';
import { View, Text, Dimensions, Alert } from 'react-native';
import IconButton from './inputs/IconButton';
import { createStyle } from '../providers/Theme';
import { useNavigation } from '@react-navigation/native';

const width = Dimensions.get('screen').width;

const NavigationHeader = ({ variant }: PropsType) => {
	const styles = useStyles();
	const { navigate, goBack } = useNavigation();

	return variant == 'settings' ? (
		<View style={styles.navigationSettingsContainer}>
			<IconButton
				packageName="Entypo"
				iconName="cog"
				onPress={() => navigate('SettingsScreen')}
			/>
		</View>
	) : (
		<View style={styles.navigationContainer}>
			<IconButton
				packageName="Entypo"
				iconName="home"
				onPress={() => navigate('HomeScreen')}
			/>
			<IconButton packageName="Entypo" iconName="arrow-left" onPress={() => goBack()} />
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
		right: 0,
		zIndex: 10,
	},
	navigationSettingsContainer: {
		width: screenWidth,
		flexDirection: 'row-reverse',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 5,
		paddingHorizontal: 5,
		position: 'absolute',
		top: 0,
		right: 0,
		zIndex: 10,
	},
}));

interface PropsType {
	variant?: 'settings';
}
