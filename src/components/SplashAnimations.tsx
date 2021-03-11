import React from 'react';
import LottieView from 'lottie-react-native';
import { useData } from '../providers/Data';
import { createStyle } from '../providers/Theme';

import Clouds from '../components/Clouds';
import ScreenBase from '../components/ScreenBase';
import CodicLogo from '../assets/data/splash/CodicLogo';
import CloudsBottom from '../assets/data/splash/CloudsBottom';

const SplashAnimations = () => {
	const styles = useStyles();
	const { splash } = useData();

	return (
		<ScreenBase>
			<Clouds />
			<LottieView source={splash.splashAnimation} autoPlay />
			<CodicLogo style={styles.logo} />
			<CloudsBottom style={styles.bottomCloud} />
		</ScreenBase>
	);
};

export default SplashAnimations;

const useStyles = createStyle({
	logo: {
		position: 'absolute',
		bottom: 10,
		right: 10,
		zIndex: 10,
	},
	bottomCloud: {
		bottom: 0,
		position: 'absolute',
		width: '100%',
		height: 306,
	},
});
