//TODO change to correct object on all animals (not pig)

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
			// soundSrc: require('./pig/sounding.wav'),
		},

		thumbnailSrc: require('./horse/default.json'),
	},
	pig4: {
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
	pig5: {
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
	pig6: {
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
};

export default animals;
