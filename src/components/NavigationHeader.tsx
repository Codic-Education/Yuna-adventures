import React from 'react';
import { View } from 'react-native';
import IconButton from './inputs/IconButton';
import { createStyle } from '../providers/Theme';
import { useNavigation } from '@react-navigation/native';

const NavigationHeader = ({ variant = 'backAndHome' }: PropsType) => {
	const styles = useStyles();
	const { navigate, goBack } = useNavigation();

	return (
		<View style={styles.NavigationHeader}>
			{variant === 'settings' ? (
				<IconButton
					packageName="Entypo"
					iconName="cog"
					onPress={() => navigate('SettingsScreen')}
				/>
			) : (
				<>
					<IconButton
						packageName="Entypo"
						iconName="arrow-right"
						onPress={() => goBack()}
					/>
					{variant === 'backAndHome' && (
						<IconButton
							packageName="Entypo"
							iconName="home"
							onPress={() => navigate('HomeScreen')}
						/>
					)}
				</>
			)}
		</View>
	);
};

export default NavigationHeader;

const useStyles = createStyle(({ dimensions: { screenWidth } }) => ({
	NavigationHeader: {
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
	variant?: 'settings' | 'backAndHome' | 'back';
}
