const animals = {
	pig: {
		scene: 'farm',
		animationObject: {
			animationSrc: require('./pig/default.json'),
		},
		onClickAnimationObject: {
			animationSrc: require('./pig/sounding.json'),
			soundSrc: require('./pig/sounding.wav'),
		},

		thumbnailSrc: require('./pig/default.json'),
	},
	monkey: {
		scene: 'farm',
		animationObject: {
			animationSrc: require('./monkey/default.json'),
		},
		onClickAnimationObject: {
			animationSrc: require('./monkey/sounding.json'),
			soundSrc: require('./monkey/sounding.wav'),
		},

		thumbnailSrc: require('./monkey/default.json'),
	},
	horse: {
		scene: 'farm',
		animationObject: {
			animationSrc: require('./horse/default.json'),
		},
		onClickAnimationObject: {
			animationSrc: require('./horse/sounding.json'),
			soundSrc: require('./horse/sounding.wav'),
		},

		thumbnailSrc: require('./horse/default.json'),
	},
	cow: {
		scene: 'farm',
		animationObject: {
			animationSrc: require('./cow/default.json'),
		},
		onClickAnimationObject: {
			animationSrc: require('./cow/sounding.json'),
			soundSrc: require('./cow/sounding.wav'),
		},

		thumbnailSrc: require('./cow/default.json'),
	},
	dog: {
		scene: 'farm',
		animationObject: {
			animationSrc: require('./dog/default.json'),
		},
		onClickAnimationObject: {
			animationSrc: require('./dog/sounding.json'),
			soundSrc: require('./dog/sounding.wav'),
		},

		thumbnailSrc: require('./dog/default.json'),
	},
	duck: {
		scene: 'farm',
		animationObject: {
			animationSrc: require('./duck/default.json'),
		},
		onClickAnimationObject: {
			animationSrc: require('./duck/sounding.json'),
			soundSrc: require('./duck/sounding.wav'),
		},

		thumbnailSrc: require('./duck/default.json'),
	},
};

export default animals;
