import { Audio } from 'expo-av';
import { Sound } from 'expo-av/build/Audio';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { ChildrenType } from '../constants/globalTypes';

const SoundsContext = createContext<any>(null);

const SoundsProvider = ({ children, ...props }: ChildrenType) => {
	const [sounds] = useState({ buttonSound: new Audio.Sound() });
	useEffect(() => {
		(async () => {
			await sounds.buttonSound.loadAsync(require('../assets/sounds/button.wav'));
			sounds.buttonSound.setVolumeAsync(0.025);
		})();
		return () => {
			Object.values(sounds).map((sound) => {
				try {
					sound.unloadAsync();
				} catch (error) {}
				return sound;
			});
		};
	}, []);

	return (
		<SoundsContext.Provider {...props} value={{ ...sounds }}>
			{children}
		</SoundsContext.Provider>
	);
};

export default SoundsProvider;

export const useSounds = () => useContext<{ [key: string]: Sound }>(SoundsContext);
