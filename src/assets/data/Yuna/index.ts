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
	vehicles: {
		win: require('./vehicles/win.json'),
		talking: require('./vehicles/talking.json'),
		sounding: require('./vehicles/sounding.json'),
		correctAnswer: require('./vehicles/correct-answer.json'),
		wrongAnswer: require('./vehicles/wrong-answer.json'),
		waiting: require('./vehicles/waiting.json'),
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
