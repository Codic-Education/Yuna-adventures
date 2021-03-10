import React from 'react';
import IconButton from './inputs/IconButton';
import { createStyle } from '../providers/Theme';
import { useNavigation } from '@react-navigation/native';

const NavigationHeader = ({ variant = 'back' }: PropsType) => {
	const styles = useStyles();
	const { navigate, goBack } = useNavigation();

	const buttons = {
		settings: [
			{
				packageName: 'Entypo',
				iconName: 'cog',
				onPress: () => navigate('SettingsScreen'),
				style: styles.rightButton,
			},
		],
		back: [
			{
				packageName: 'Entypo',
				iconName: 'arrow-left',
				onPress: () => goBack(),
				style: styles.leftButton,
			},
		],
		home: [
			{
				packageName: 'Entypo',
				iconName: 'home',
				onPress: () => navigate('HomeScreen'),
				style: styles.leftButton,
			},
		],
	};

	return (
		<>
			{buttons[variant].map((props: {}, i: number) => (
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

interface PropsType {
	variant?: 'settings' | 'home' | 'back';
}
