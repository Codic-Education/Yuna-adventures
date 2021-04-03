import React from 'react';
import IconButton, { IconButtonPropsType } from './inputs/IconButton';
import { createStyle } from '../providers/Theme';
import { useNavigation } from '@react-navigation/native';

const NavigationHeader = ({ variant = 'back' }: NavigationHeaderPropsType) => {
	const styles = useStyles();
	const { navigate, goBack } = useNavigation();

	const buttons: { [key in variantType]: [IconButtonPropsType] } = {
		// a variant can have multiple buttons
		settings: [
			{
				lottieFileSrc: require('../assets/icons/settings.json'),
				onPress: () => navigate('SettingsScreen'),
				style: styles.rightButton,
			},
		],
		back: [
			{
				lottieFileSrc: require('../assets/icons/arrow-left.json'),
				onPress: () => goBack(),
				style: styles.leftButton,
			},
		],
		home: [
			{
				lottieFileSrc: require('../assets/icons/home.json'),
				onPress: () => navigate('HomeScreen'),
				style: styles.leftButton,
			},
		],
	};

	return (
		<>
			{buttons[variant].map((props, i: number) => (
				<IconButton key={variant + i} {...props} />
			))}
		</>
	);
};

export default NavigationHeader;

const useStyles = createStyle({
	leftButton: {
		position: 'absolute',
		top: 10,
		left: 10,
		zIndex: 100,
	},
	rightButton: {
		position: 'absolute',
		top: 10,
		right: 10,
		zIndex: 100,
	},
});

type variantType = 'settings' | 'home' | 'back';

interface NavigationHeaderPropsType {
	variant?: variantType;
}
