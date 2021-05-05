import { LevelType, PURCHASE_STATE } from '../../../../constants/globalTypes';
import PaidProducts, { freeProducts } from '../levelsSkus';

const animalsLevels: Array<LevelType> = [
	{
		productId: freeProducts.animalsLvl1,
		purchaseState: PURCHASE_STATE.PURCHASED,
		yunaSetVariant: 'animals',
		items: [
			{
				scene: 'farm',
				animationObject: {
					animationSrc: require('./pig/default.json'),
				},
				onClickAnimationObject: {
					animationSrc: require('./pig/sounding.json'),
					soundSrc: require('./pig/sounding-audio.wav'),
				},
				thumbnailSrc: require('./pig/default.json'),
				name: {
					en: require('./pig/name/en.wav'),
					sv: require('./pig/name/sv.wav'),
				},
			},
			{
				scene: 'farm',
				animationObject: {
					animationSrc: require('./horse/default.json'),
				},
				onClickAnimationObject: {
					animationSrc: require('./horse/sounding.json'),
					soundSrc: require('./horse/sounding-audio.wav'),
				},

				thumbnailSrc: require('./horse/default.json'),
				name: {
					en: require('./horse/name/en.wav'),
					sv: require('./horse/name/sv.wav'),
				},
			},
			{
				scene: 'forest',
				animationObject: {
					animationSrc: require('./monkey/default.json'),
				},
				onClickAnimationObject: {
					animationSrc: require('./monkey/sounding.json'),
					soundSrc: require('./monkey/sounding-audio.wav'),
				},

				thumbnailSrc: require('./monkey/default.json'),
				name: {
					en: require('./monkey/name/en.wav'),
					sv: require('./monkey/name/sv.wav'),
				},
			},
		],
		quiz: {
			scene: 'nature1',
		},
	},
	{
		productId: PaidProducts.animalsLvl2,
		purchaseState: PURCHASE_STATE.UNPURCHASED,
		yunaSetVariant: 'animals',
		items: [
			{
				scene: 'farm',
				animationObject: {
					animationSrc: require('./dog/default.json'),
				},
				onClickAnimationObject: {
					animationSrc: require('./dog/sounding.json'),
					soundSrc: require('./dog/sounding-audio.wav'),
				},

				thumbnailSrc: require('./dog/default.json'),
				name: {
					en: require('./dog/name/en.wav'),
					sv: require('./dog/name/sv.wav'),
				},
			},
			{
				scene: 'farm',
				animationObject: {
					animationSrc: require('./cow/default.json'),
				},
				onClickAnimationObject: {
					animationSrc: require('./cow/sounding.json'),
					soundSrc: require('./cow/sounding-audio.wav'),
				},

				thumbnailSrc: require('./cow/default.json'),
				name: {
					en: require('./cow/name/en.wav'),
					sv: require('./cow/name/sv.wav'),
				},
			},
			{
				scene: 'forest',
				animationObject: {
					animationSrc: require('./duck/default.json'),
				},
				onClickAnimationObject: {
					animationSrc: require('./duck/sounding.json'),
					soundSrc: require('./duck/sounding-audio.wav'),
				},

				thumbnailSrc: require('./duck/default.json'),
				name: {
					en: require('./duck/name/en.wav'),
					sv: require('./duck/name/sv.wav'),
				},
			},
		],
		quiz: {
			scene: 'nature1',
		},
	},
];

export default animalsLevels;
