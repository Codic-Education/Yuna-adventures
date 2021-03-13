import React from 'react';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/core';

import Clouds from '../components/Clouds';
import ScreenBase from '../components/ScreenBase';
import CodicLogo from '../assets/data/splash/CodicLogo';
import { getScaledHeight, getScaledWidth } from '../utilities';
import splashObj from '../assets/data/splash';
import { createStyle } from '../providers/Theme';

const SplashAnimations = () => {
	const navigation = useNavigation();
	const styles = useStyles({ width: splashObj.splashAnimation.w });

	return (
		<ScreenBase style={{ justifyContent: 'center' }}>
			<Clouds />
			<LottieView
				style={styles.logga}
				resizeMode="contain"
				source={splashObj.splashAnimation}
				autoPlay
				loop={false}
				onAnimationFinish={() => navigation.navigate('HomeStackNavigator')}
			/>
			<CodicLogo style={styles.codicLogo} />
		</ScreenBase>
	);
};

export default SplashAnimations;

const useStyles = createStyle({
	codicLogo: {
		position: 'absolute',
		bottom: 10,
		right: 10,
	},
	bottomCloud: {
		bottom: 0,
		position: 'absolute',
		width: getScaledWidth(1900),
		height: getScaledHeight(390),
	},
	logga: {
		width: ({ width }: PropsType) => getScaledWidth(width),
		alignSelf: 'center',
	},
});
interface PropsType {
	width: Number | any;
}
