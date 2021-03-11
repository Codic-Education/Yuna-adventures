import React from 'react';
import LottieView from 'lottie-react-native';
import { ScreenProps } from '../constants/globalTypes';
import { useData } from '../providers/Data';
import { Text } from 'react-native';
import Clouds from '../components/Clouds';
import ScreenBase from '../components/ScreenBase';
//TODO change logo to svg 
const SplashScreen = ({ navigation }: ScreenProps<any>) => {
	const { splash } = useData();
	setTimeout(() => {
		navigation.navigate('HomeStackNavigator');
	}, 4500);

	return (
		<ScreenBase>
			<Clouds />

			<LottieView source={splash.splashAnimation} autoPlay />
			<Text
				style={{
					position: 'absolute',
					bottom: 10,
					right: 10,
					fontWeight: '800',
					fontSize: 18,
				}}
			>
				Codic
			</Text>
		</ScreenBase>
	);
};

export default SplashScreen;
