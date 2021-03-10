import React from 'react';
import LottieView from 'lottie-react-native';
import def from './default.json';
import { createStyle } from '../../providers/Theme';
import { StylePropertyType } from '../../constants/globalTypes';

const Clouds = ({ style }: PropsType) => {
	const styles = useStyle();
	return (
		<LottieView
			source={def}
			style={[styles.Clouds, style]}
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
		zIndex: 0,
	},
});

type PropsType = {
	style?: StylePropertyType;
};
