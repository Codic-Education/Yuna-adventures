import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import Providers from './src/providers';
import Screens from './src/Screens';
import ImmersiveMode from 'react-native-immersive-mode';
import { AppState, Platform } from 'react-native';

const App = () => {
	useEffect(() => {
		AppState.addEventListener('change', (nextAppState) => {
			try {
				if (Platform.OS === 'android' && nextAppState === 'active') {
					ImmersiveMode.fullLayout(true);
					ImmersiveMode.setBarMode('FullSticky');
				}
			} catch (e) {}
		});
	}, []);

	return (
		<Providers>
			<StatusBar style="light" hidden />
			<Screens />
		</Providers>
	);
};

export default App;
