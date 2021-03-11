import React from 'react';
import { ScreenProps } from '../constants/globalTypes';
import SplashAnimations from '../components/SplashAnimations';

const SplashScreen = ({ navigation }: ScreenProps<any>) => {
	setTimeout(() => {
		navigation.navigate('HomeStackNavigator');
	}, 4500);

	return (
		<>
			<SplashAnimations />
		</>
	);
};

export default SplashScreen;
