import React from 'react';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/core';
import Clouds from '../components/Clouds';
import ScreenBase from '../components/ScreenBase';
//import CodicLogo from '../assets/data/splash/CodicLogo';
import { getScaledHeight, getScaledWidth } from '../utilities';
import splashAnimation from '../assets/animations/splashAnimation.json';
import { createStyle } from '../providers/Theme';

//FIXME: codic logo bug
//TODO: Move CodicLogo & CloudsBottom to components folder or use lottiefiles instead of svg that can be an alternative to avoid actual svg bug.

const SplashAnimations = () => {
	const navigation = useNavigation();
	const styles = useStyles({ width: splashAnimation.w });

	return (
		<ScreenBase style={{ justifyContent: 'center' }}>
			<Clouds />
			<LottieView
				style={styles.logo}
				resizeMode="contain"
				source={splashAnimation}
				autoPlay
				loop={false}
				onAnimationFinish={() => navigation.navigate('HomeStackNavigator')}
			/>
			{/*<CodicLogo style={styles.codicLogo} />*/}
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
	logo: {
		width: ({ width }: PropsType) => getScaledWidth(width),
		alignSelf: 'center',
	},
});
interface PropsType {
	width: Number | any;
}
