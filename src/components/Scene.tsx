import React from 'react';
import LottieView from 'lottie-react-native';
import { createStyle } from '../providers/Theme';
import { LottieSourceType } from '../constants/globalTypes';

const Scene = ({ lottieFileSrc }: PropsType) => {
	const styles = useStyle();

	return <LottieView source={lottieFileSrc} style={styles.Scene} resizeMode="cover" autoPlay />;
};

export default Scene;

const useStyle = createStyle({
	Scene: {
		width: '100%',
		height: '100%',
		position: 'absolute',
	},
});

interface PropsType {
	lottieFileSrc: LottieSourceType;
}
