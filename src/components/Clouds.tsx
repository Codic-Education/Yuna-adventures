import React from 'react';
import LottieView from 'lottie-react-native';
import cloud from '../assets/animations/cloud.json';
import { createStyle } from '../providers/Theme';
import { StylePropertyType } from '../constants/globalTypes';

const Clouds = ({ style }: CloudsPropsType) => {
	const styles = useStyles();
	return (
		<LottieView
			source={cloud}
			style={[styles.Clouds, style]}
			loop
			autoPlay
			resizeMode="cover"
			speed={0.02}
		/>
	);
};

export default Clouds;

const useStyles = createStyle({
	Clouds: {
		width: '100%',
		position: 'absolute',
		top: 0,
		left: 0,
		zIndex: 0,
	},
});

type CloudsPropsType = {
	style?: StylePropertyType;
};
