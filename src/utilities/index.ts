// Dimensions that have been used with illustration & animation design "entireScene"
import { Dimensions } from 'react-native';

const preDimensions = {
	width: 1900,
	height: 1068.21,
};

export const getScaledWidth = (initialWidth: number) => {
	return (Dimensions.get('screen').width * initialWidth) / preDimensions.width;
};
