// Dimensions that have been used with illustration & animation design "entireScene"
import { Dimensions } from 'react-native';

const preDimensions = {
	width: 1900,
	height: 1068.21,
};

export const getScaledWidth = (initialWidth: number) => {
	return (Dimensions.get('screen').width * initialWidth) / preDimensions.width;
};

export const getScaledHeight = (initialHeight: number) => {
	return (Dimensions.get('screen').height * initialHeight) / preDimensions.height;
};

export const getRandomNumbersArray = (min: number, max: number) => {
	if (min === max) {
		return [min];
	}
	const firstNumber = min < max ? min : max;
	const lastNumber = min < max ? max : min;

	const numbers = [];
	const result = [];
	for (let i = firstNumber; i < lastNumber + 1; i++) {
		numbers.push(i);
	}
	for (let i = 0; numbers.length > 0; i++) {
		const randomIndex = Math.floor(Math.random() * numbers.length);
		result.push(numbers[randomIndex]);
		numbers.splice(randomIndex, 1);
	}
	return result;
};
