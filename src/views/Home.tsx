import React from 'react';
import Clouds from '../components/Clouds';
import Ground from '../components/Ground';
import ViewBackground from '../components/ViewBackground';

const Home = () => {
	return (
		<ViewBackground>
			<Clouds />
			<Ground variant="farm" />
		</ViewBackground>
	);
};

export default Home;

