import React from 'react';
import { View, Text } from 'react-native';
import { createStyle } from '../providers/Theme';
import LottieView from 'lottie-react-native';
import sun from '../assets/animations/sun.json';
import { getScaledWidth } from '../utilities';

const Sun = () => {
	const styles = useStyles({ sunWidth: sun.w });

	return <LottieView source={sun} autoPlay style={styles.sun} resizeMode="contain" />;
};

export default Sun;

const useStyles = createStyle({
	sun: {
		width: ({ sunWidth }) => getScaledWidth(sunWidth),
		position: 'absolute',
		right: 0,
		top: 0,
	},
});
