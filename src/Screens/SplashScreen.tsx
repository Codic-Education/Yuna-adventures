import React from 'react';
import LottieView from 'lottie-react-native';
import ScreenBase from '../components/ScreenBase';
import Clouds from '../components/Clouds';
import { createStyle } from '../providers/Theme';
import { getScaledWidth } from '../utilities';
import { ScreenProps } from '../constants/globalTypes';
import splashAnimation from '../assets/animations/splashAnimation.json';
import bottomClouds from '../assets/animations/clouds-bottom.json';

const SplashScreen = ({ navigation }: ScreenProps<undefined>) => {
	const styles = useStyles({ width: splashAnimation.w });

	return (
		<ScreenBase style={styles.SplashScreen}>
			<Clouds />
			<LottieView
				style={styles.cloudsBottom}
				resizeMode="contain"
				source={bottomClouds}
				autoPlay
			/>
			<LottieView
				style={styles.logo}
				resizeMode="contain"
				source={splashAnimation}
				autoPlay
				loop={false}
				onAnimationFinish={() => navigation.navigate('HomeStackNavigator')}
			/>
		</ScreenBase>
	);
};

export default SplashScreen;

const useStyles = createStyle({
	SplashScreen: { justifyContent: 'center', position: 'relative' },
	cloudsBottom: {
		position: 'absolute',
		width: '100%',
		bottom: 0,
	},
	logo: {
		width: ({ width }) => getScaledWidth(width),
		alignSelf: 'center',
	},
});
