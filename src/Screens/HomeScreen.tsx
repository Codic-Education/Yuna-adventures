import { useNavigation } from '@react-navigation/native';
import React from 'react';
import Clouds from '../components/Clouds';
import Ground from '../components/Ground';
import Button from '../components/inputs/Button';
import ViewBackground from '../components/ViewBackground';
import { createStyle } from '../providers/Theme';

const HomeScreen = () => {
	const navigation = useNavigation();
	const styles = useStyles();

	return (
		<ViewBackground>
			<Clouds />
			<Ground variant="farm" />

			<Button onPress={() => navigation.navigate('AnimalNavigator')} style={styles.button}>
				Press to go to Animals
			</Button>
			<Button onPress={() => navigation.navigate('SettingScreen')} style={styles.button}>
				Press to go to Settings
			</Button>
		</ViewBackground>
	);
};

export default HomeScreen;
const useStyles = createStyle(({ dimensions: { screenWidth } }) => ({
	button: {
		borderColor: '#000',
		borderWidth: 2,
		top: 10,
		width: screenWidth / 3,
		height: 'auto',
	},
}));
