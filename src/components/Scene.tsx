import React from 'react';
import LottieView from 'lottie-react-native';
import { createStyle } from '../providers/Theme';
import { LottieSourceType, StylePropertyType } from '../constants/globalTypes';
import { View } from 'react-native';

const Scene = ({ lottieFileSrc, filter, autoPlay }: PropsType) => {
	const styles = useStyle();

	return (
		<>
			<LottieView
				source={lottieFileSrc}
				style={styles.Scene}
				resizeMode="cover"
				autoPlay={autoPlay}
			/>
			{filter && <View style={[styles.Scene, filter]} />}
		</>
	);
};

export default Scene;

const useStyle = createStyle({
	Scene: {
		width: '100%',
		height: '100%',
		position: 'absolute',
		top: 0,
		left: 0,
	},
});

interface PropsType {
	lottieFileSrc: LottieSourceType;
	filter?: StylePropertyType;
	autoPlay?: boolean;
}
