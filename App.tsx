import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import Providers from './src/providers';
import Screens from './src/Screens';
import ImmersiveMode from 'react-native-immersive-mode';
import { Platform } from 'react-native';

const App = () => {
	useEffect(() => {
		if (Platform.OS === 'android') {
			ImmersiveMode.fullLayout(true);
			ImmersiveMode.setBarMode('FullSticky');
		}
	}, []);

	return (
		<Providers>
			<StatusBar style="light" hidden />
			<Screens />
		</Providers>
	);
};

export default App;
