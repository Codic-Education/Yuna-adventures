import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Providers from './src/providers';
import Screens from './src/Screens';

const App = () => {
	return (
		<Providers>
			<StatusBar style="light" hidden />
			<Screens />
		</Providers>
	);
};

export default App;
