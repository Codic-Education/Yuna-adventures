import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Providers from './src/providers';
import Views from './src/views';

const App = () => {
	return (
		<Providers>
			<StatusBar style="auto" />
			<Views />
		</Providers>
	);
};

export default App;
