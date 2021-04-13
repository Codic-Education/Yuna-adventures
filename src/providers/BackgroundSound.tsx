import { Audio } from 'expo-av';
import { Sound } from 'expo-av/build/Audio';
import React, { createContext, useContext, useEffect, useState } from 'react';
import backgroundSoundSrc from '../assets/sounds/background.wav';
import { ChildrenType } from '../constants/globalTypes';
import asyncStorage from '@react-native-async-storage/async-storage';
import { parseBoolean } from '../utilities';

const backgroundSoundPlayDelay = 500;

const BackgroundSoundContext = createContext<ContextPropsType>({
	resumeBackgroundSound: () => {},
	pauseBackgroundSound: () => {},
	isBackgroundSoundActive: true,
});

const BackgroundSound = ({ children }: ChildrenType) => {
	const [backgroundSound, setBackgroundSound] = useState<Sound | null>(null);
	const [isBackgroundSoundActive, setIsBackgroundSoundActive] = useState(false);

	const loadBackgroundSound = async () => {
		const { sound } = await Audio.Sound.createAsync(backgroundSoundSrc);
		sound.setIsLoopingAsync(true);
		sound.setVolumeAsync(0.05);
		setBackgroundSound(sound);
	};

	const playBackgroundSound = async () => {
		if (backgroundSound) {
			backgroundSound.playAsync();
			setIsBackgroundSoundActive(true);
		}
	};

	const resumeBackgroundSound = () => {
		try {
			backgroundSound?.playAsync();
			updateBackgroundStateInStorage(true);
			setIsBackgroundSoundActive(true);
		} catch (e) {}
	};

	const pauseBackgroundSound = () => {
		try {
			backgroundSound?.pauseAsync();
			updateBackgroundStateInStorage(false);
			setIsBackgroundSoundActive(false);
		} catch (e) {}
	};

	const onBackgroundStateIsFetchedFromStorage = async (
		callback: (value: boolean | null) => void
	) => {
		try {
			const result = parseBoolean(await asyncStorage.getItem('isBackgroundSoundActive'));
			callback(result);
		} catch (e) {}
	};
	const updateBackgroundStateInStorage = async (value: Boolean) => {
		try {
			return await asyncStorage.setItem('isBackgroundSoundActive', value.toString());
		} catch (e) {}
	};

	useEffect(() => {
		loadBackgroundSound();
		onBackgroundStateIsFetchedFromStorage((value) => {
			if (value !== null) {
				setIsBackgroundSoundActive(value);
			} else {
				updateBackgroundStateInStorage(true);
				setIsBackgroundSoundActive(true);
			}
		});
		return () => {
			backgroundSound?.pauseAsync();
			backgroundSound?.unloadAsync();
		};
	}, []);

	useEffect(() => {
		if (backgroundSound?._loaded && isBackgroundSoundActive) {
			setTimeout(() => {
				playBackgroundSound();
			}, backgroundSoundPlayDelay);
		}
	}, [backgroundSound?._loaded]);

	useEffect(() => {
		updateBackgroundStateInStorage(isBackgroundSoundActive);
	}, [isBackgroundSoundActive]);

	return (
		<BackgroundSoundContext.Provider
			value={{ resumeBackgroundSound, pauseBackgroundSound, isBackgroundSoundActive }}
		>
			{children}
		</BackgroundSoundContext.Provider>
	);
};

export default BackgroundSound;

export const useBackgroundSound = () => useContext(BackgroundSoundContext);

interface ContextPropsType {
	resumeBackgroundSound: () => void;
	pauseBackgroundSound: () => void;
	isBackgroundSoundActive: boolean;
}
