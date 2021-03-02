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
	},
};

export default animals;
