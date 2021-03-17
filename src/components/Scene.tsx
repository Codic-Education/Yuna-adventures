import React, { forwardRef, useEffect, useState } from 'react';
import LottieView from 'lottie-react-native';
import { createStyle } from '../providers/Theme';
import { LottieSourceType, StylePropertyType } from '../constants/globalTypes';
import { View } from 'react-native';
import { AVPlaybackSource } from 'expo-av/build/AV';
import { useSound } from '../providers/Sound';
import { Audio } from 'expo-av';

const Scene = forwardRef(
	({ lottieFileSrc, backgroundSound, filter, autoPlay, loop = true }: ScenePropsType, ref) => {
		const styles = useStyles();
		const { isBackgroundSoundActive, pauseBackgroundSound, resumeBackgroundSound } = useSound();
		const [sound] = useState(new Audio.Sound());

		useEffect(() => {
			(async () => {
				if (backgroundSound) {
					isBackgroundSoundActive && pauseBackgroundSound();
					await sound.loadAsync(backgroundSound);
					sound.setIsLoopingAsync(true);
					sound.setVolumeAsync(0.035);
					sound.playAsync();
				}
			})();

			return () => {
				if (sound._loaded) {
					sound.unloadAsync();
					if (isBackgroundSoundActive) {
						resumeBackgroundSound();
					}
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
	backgroundSound?: AVPlaybackSource;
	filter?: StylePropertyType;
	autoPlay?: boolean;
	loop?: boolean;
}
