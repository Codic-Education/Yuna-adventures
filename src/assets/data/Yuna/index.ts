//TODO:Move to animations!

import { LottieSourceType } from '../../../constants/globalTypes';

const variants: YunaVariantsType = {
	cup: require('./cup.json'),
	talking: require('./talking.json'),
	sounding: require('./sounding.json'),
	trueAnswer: require('./true-answer.json'),
	falseAnswer: require('./false-answer.json'),
};

export default variants;

export type YunaVariantsType = {
	[key in 'cup' | 'talking' | 'sounding' | 'trueAnswer' | 'falseAnswer']: LottieSourceType;
};
