import React, { forwardRef, useEffect, useState } from 'react';
import LottieView from 'lottie-react-native';
import { createStyle } from '../providers/Theme';
import { LottieSourceType, StylePropertyType } from '../constants/globalTypes';
import { View } from 'react-native';
import { AVPlaybackSource } from 'expo-av/build/AV';
import { useBackgroundSound } from '../providers/BackgroundSound';
import { Audio } from 'expo-av';

const Scene = forwardRef(
	({ lottieFileSrc, audioFile, filter, autoPlay, loop = true }: ScenePropsType, ref) => {
		const styles = useStyles();
		const {
			isBackgroundSoundActive,
			pauseBackgroundSound,
			resumeBackgroundSound,
		} = useBackgroundSound();
		const [sound] = useState(new Audio.Sound());

		useEffect(() => {
			const unloadSceneSound = (async () => {
				if (audioFile) {
					isBackgroundSoundActive && pauseBackgroundSound();
					await sound.loadAsync(audioFile);
					sound.setIsLoopingAsync(true);
					sound.setVolumeAsync(0.035);
					sound.playAsync();
					return () => sound.unloadAsync();
				}
			})();

			return () => {
				(async () => {
					const unloadSound = await unloadSceneSound;
					unloadSound && unloadSound();
				})();
				if (audioFile && isBackgroundSoundActive) {
					resumeBackgroundSound();
				}
			};
		}, []);
		return (
			<>
				<LottieView
					ref={ref}
					source={lottieFileSrc}
					style={styles.Scene}
					resizeMode="cover"
					autoPlay={autoPlay}
					loop={loop}
				/>
				{filter && <View style={[styles.Scene, filter]} />}
			</>
		);
	}
);

export default Scene;

const useStyles = createStyle({
	Scene: {
		width: '100%',
		height: '100%',
		position: 'absolute',
		top: 0,
		left: 0,
	},
});

interface ScenePropsType {
	lottieFileSrc: LottieSourceType;
	audioFile?: AVPlaybackSource;
	filter?: StylePropertyType;
	autoPlay?: boolean;
	loop?: boolean;
}
