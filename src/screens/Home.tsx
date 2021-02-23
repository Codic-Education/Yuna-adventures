import React from 'react';
import Clouds from '../components/Clouds';
import Scene from '../components/Scene';
import ViewBackground from '../components/ViewBackground';

const Home = () => {
	return (
		<ViewBackground>
			<Clouds />
			<Scene variant="farm" />
		</ViewBackground>
	);
};

export default Home;
