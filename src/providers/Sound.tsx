import { Audio } from 'expo-av';
import { Sound } from 'expo-av/build/Audio';
import React, { createContext, useContext, useEffect, useState } from 'react';
import backgroundSoundSrc from '../assets/sounds/background.wav';
import { ChildrenType } from '../constants/globalTypes';


const backgroundSoundPlayDelay = 500;

const SoundContext = createContext<ContextPropsType>({
	resumeBackgroundSound: () => {},
	pauseBackgroundSound: () => {},
	isBackgroundSoundActive: true,
});

const SoundProvide = ({ children }: ChildrenType) => {
	const [backgroundSound, setBackgroundSound] = useState<Sound | null>(null);
	const [isBackgroundSoundActive, setIsBackgroundSoundActive] = useState(true);

	const playBackgroundSound = async () => {
		const { sound } = await Audio.Sound.createAsync(backgroundSoundSrc);
		sound.setIsLoopingAsync(true);
		sound.setVolumeAsync(0.05);
		//TODO:Enable backgroundSound
		//sound.playAsync();
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

interface ContextPropsType {
	resumeBackgroundSound: () => void;
	pauseBackgroundSound: () => void;
	isBackgroundSoundActive: boolean;
}
