import React from 'react';
import LottieView from 'lottie-react-native';
import ScreenBase from '../components/ScreenBase';
import Clouds from '../components/Clouds';
import { createStyle } from '../providers/Theme';
import { getScaledWidth } from '../utilities';
import { ScreenProps } from '../constants/globalTypes';
import splashAnimation from '../assets/animations/splashAnimation.json';
import codicLogo from '../assets/animations/codic-logo.json';
import bottomClouds from '../assets/animations/clouds-bottom.json';
import Sun from '../components/Sun';

const SplashScreen = ({ navigation }: ScreenProps<undefined>) => {
	const styles = useStyles({ logoWidth: splashAnimation.w, codicLogoWidth: codicLogo.w });

	return (
		<ScreenBase style={styles.SplashScreen}>
			<Clouds />
			<Sun />
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
			<LottieView style={styles.codicLogo} resizeMode="contain" source={codicLogo} />
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
		width: ({ logoWidth }) => getScaledWidth(logoWidth),
		alignSelf: 'center',
	},
	codicLogo: {
		width: ({ codicLogoWidth }) => getScaledWidth(codicLogoWidth + 50),
		position: 'absolute',
		bottom: 10,
		right: 10,
	},
});
