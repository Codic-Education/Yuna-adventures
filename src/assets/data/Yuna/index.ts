//TODO:Move to animations!

import { LottieSourceType } from '../../../constants/globalTypes';

const variants: YunaVariantsType = {
	animals: {
		win: require('./animals/win.json'),
		talking: require('./animals/talking.json'),
		sounding: require('./animals/sounding.json'),
		correctAnswer: require('./animals/correct-answer.json'),
		wrongAnswer: require('./animals/wrong-answer.json'),
		waiting: require('./animals/waiting.json'),
	},
};

export default variants;

export type YunaVariantsType = {
	[key: string]: {
		[key in
			| 'win'
			| 'talking'
			| 'sounding'
			| 'correctAnswer'
			| 'wrongAnswer'
			| 'waiting']: LottieSourceType;
	};
};
