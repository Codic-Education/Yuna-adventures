import React from 'react';
import LottieView from 'lottie-react-native';
import farm from './farm.json';
import forest from './forest.json';
import { createStyle } from '../../providers/Theme';
import { SceneVariantType } from '../../constants/globalTypes';

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

const getScene = (variant: SceneVariantType) => {
	switch (variant) {
		case 'farm':
			return farm;
		case 'forest':
			return forest;
		default:
			return farm;
	}
};

interface PropsType {
	variant: SceneVariantType;
}
