import React from 'react';
import LottieView from 'lottie-react-native';
import ScreenBase from '../components/ScreenBase';
import Clouds from '../components/Clouds';
import { createStyle } from '../providers/Theme';
import { getScaledWidth } from '../utilities';
import { ScreenProps } from '../constants/globalTypes';
import splashAnimation from '../assets/animations/splashAnimation.json';

const SplashScreen = ({ navigation }: ScreenProps<undefined>) => {
	const styles = useStyles({ width: splashAnimation.w });

	return (
		<ScreenBase style={styles.SplashScreen}>
			<Clouds />
			<LottieView
				style={styles.logo}
				resizeMode="contain"
				source={splashAnimation}
				autoPlay
				loop={false}
				onAnimationFinish={() => navigation.navigate('HomeStackNavigator')}
			/>
		{/*	<CodicLogo style={styles.codicLogo} /> */}
		</ScreenBase>
	);
};

export default SplashScreen;

const useStyles = createStyle({
	SplashScreen: { justifyContent: 'center' },
	logo: {
		width: ({ width }) => getScaledWidth(width),
		alignSelf: 'center',
	},
	codicLogo: {
		position: 'absolute',
		bottom: 10,
		right: 10,
	},
});
