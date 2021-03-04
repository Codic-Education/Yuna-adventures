import { Audio } from 'expo-av';
import { Sound } from 'expo-av/build/Audio';
import React, { createContext, useContext, useEffect, useState } from 'react';
import backgroundSoundSrc from '../assets/sounds/background.wav';

const backgroundSoundPlayDelay = 3000;

const SoundContext = createContext({});

const SoundProvide = ({ children }) => {
	const [backgroundSound, setBackgroundSound] = useState<Sound | null>(null);
	const [isBackgroundSoundActive, setIsBackgroundSoundActive] = useState(true);

	const playBackgroundSound = async () => {
		const { sound } = await Audio.Sound.createAsync(backgroundSoundSrc);
		sound.setIsLoopingAsync(true);
		sound.setVolumeAsync(0.05);
		sound.playAsync();
		setIsBackgroundSoundActive(true);
		setBackgroundSound(sound);
	};

	const resumeBackgroundSound = () => {
		backgroundSound?.playAsync();
		setIsBackgroundSoundActive(true);
	};

	const pauseBackgroundSound = () => {
		backgroundSound?.pauseAsync();
		setIsBackgroundSoundActive(false);
	};

	useEffect(() => {
		setTimeout(() => {
			playBackgroundSound();
		}, backgroundSoundPlayDelay);
		return () => {
			backgroundSound?.unloadAsync();
		};
	}, []);

	return (
		<SoundContext.Provider
			value={{ resumeBackgroundSound, pauseBackgroundSound, isBackgroundSoundActive }}
		>
			{children}
		</SoundContext.Provider>
	);
};

export default SoundProvide;

export const useSound = () => useContext(SoundContext);
