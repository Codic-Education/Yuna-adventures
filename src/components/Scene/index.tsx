import React from 'react';
import LottieView from 'lottie-react-native';
import farm from './farm.json';
import forest from './forest.json';
import { createStyle } from '../../providers/Theme';

const Scene = ({ variant }: PropsType) => {
	const styles = useStyle();

	return (
		<LottieView source={getScene(variant)} style={styles.Scene} resizeMode="cover" autoPlay />
	);
};

export default Scene;

const useStyle = createStyle({
	Scene: {
		width: '100%',
		height: '100%',
		position: 'absolute',
	},
});

const getScene = (variant: VariantType) => {
	switch (variant) {
		case 'farm':
			return farm;
		case 'forest':
			return forest;
		default:
			return farm;
	}
};

type VariantType = 'farm' | 'forest';

interface PropsType {
	variant: VariantType;
}
