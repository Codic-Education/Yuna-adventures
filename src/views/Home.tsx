import React from 'react';
import Cloud from '../components/svgs/Cloud';
import Ground from '../components/svgs/Ground';
import ViewBackground from '../components/ViewBackground';

const Home = () => {
	return (
		<ViewBackground>
			<Cloud width={150} opacity={0.8} />
			<Ground variant="farm" />
		</ViewBackground>
	);
};

export default Home;
