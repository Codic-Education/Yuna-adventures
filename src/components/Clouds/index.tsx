import React from 'react';
import LottieView from 'lottie-react-native';
import def from './def.json';
import { createStyle } from '../../providers/Theme';

const Clouds = () => {
	const styles = useStyle();
	return (
		<LottieView
			source={def}
			style={styles.Clouds}
			loop
			autoPlay
			resizeMode="cover"
			speed={0.02}
		/>
	);
};

export default Clouds;

const useStyle = createStyle({
	Clouds: {
		width: '100%',
		position: 'absolute',
		top: 0,
		left: 0,
	},
});
