import { StatusBar } from 'expo-status-bar';
import React from 'react';
import AppNavigation from './AppNavigation';
import Providers from './src/providers';
import Views from './src/screens';

const App = () => {
	return (
		<Providers>
			<StatusBar style="auto" />
			<AppNavigation />
		</Providers>
	);
};

export default App;
