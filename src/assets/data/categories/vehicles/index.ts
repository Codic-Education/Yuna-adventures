const vehiclesLevels = [
	{
		isPurchased: true,
		yunaSetVariant: 'vehicles',
		items: [
			{
				scene: 'cityStreet',
				animationObject: {
					animationSrc: require('./ambulance/default.json'),
				},
				onClickAnimationObject: {
					animationSrc: require('./ambulance/sounding.json'),
					soundSrc: require('./ambulance/sounding.wav'),
				},
				thumbnailSrc: require('./ambulance/default.json'),
				name: {
					en: require('./ambulance/name/en.wav'),
					sv: require('./ambulance/name/sv.wav'),
				},
			},
			{
				scene: 'cityStreet',
				animationObject: {
					animationSrc: require('./fire-truck/default.json'),
				},
				onClickAnimationObject: {
					animationSrc: require('./fire-truck/sounding.json'),
					soundSrc: require('./fire-truck/sounding.wav'),
				},

				thumbnailSrc: require('./fire-truck/default.json'),
				name: {
					en: require('./fire-truck/name/en.wav'),
					sv: require('./fire-truck/name/sv.wav'),
				},
			},
			{
				scene: 'cityStreet',
				animationObject: {
					animationSrc: require('./police-car/default.json'),
				},
				onClickAnimationObject: {
					animationSrc: require('./police-car/sounding.json'),
					soundSrc: require('./police-car/sounding.wav'),
				},

				thumbnailSrc: require('./police-car/default.json'),
				name: {
					en: require('./police-car/name/en.wav'),
					sv: require('./police-car/name/sv.wav'),
				},
			},
		],
		quiz: {
			scene: 'city1',
		},
	},
];

export default vehiclesLevels;
