import React, { useState, useEffect } from 'react';
import LottieView from 'lottie-react-native';
import Button from './inputs/Button';
import { createStyle } from '../providers/Theme';
import { Audio } from 'expo-av';
import { Sound } from 'expo-av/build/Audio';
import { AnimationObjectType, StylePropertyType } from '../constants/globalTypes';
import { getScaledHeight, getScaledWidth } from '../utilities';
const firstAutoClickDelay = 2000;
//TODO:Fix animation switching flicker bug "on Android".

const InteractiveItem = ({
	animationObject,
	onClickAnimationObject,
	position,
	style,
}: PropsType) => {
	const [isClicked, setIsClicked] = useState(false);
	const [sound, setSound] = useState<Sound | null>(null);
	const [duration, setDuration] = useState(0);

	const activeLottieSrc = isClicked
		? onClickAnimationObject.animationSrc
		: animationObject.animationSrc;

	const styles = useStyles({
		width: activeLottieSrc.w,
		position,
	});

	const handleAnimationFinish = !isClicked
		? () => {}
		: (isCancelled: boolean) => {
				!isCancelled && setIsClicked(false);
		  };

	const playSound = async () => {
		const activeSoundSrc = isClicked
			? onClickAnimationObject.soundSrc
			: animationObject.soundSrc;

		if (activeSoundSrc) {
			const { sound } = await Audio.Sound.createAsync(activeSoundSrc);
			setDuration((await sound.getStatusAsync()).durationMillis);
			sound.playAsync();
			!isClicked && sound.setIsLoopingAsync(true);
			setSound(sound);
		} else {
			setSound(null);
			setDuration(0);
		}
	};

	useEffect(() => {
		const timeOut = setTimeout(() => {
			setIsClicked(true);
		}, firstAutoClickDelay);
		return () => {
			clearTimeout(timeOut);
		};
	}, []);

	useEffect(() => {
		playSound();
		return () => {
			sound?.stopAsync();
			sound?.unloadAsync();
		};
	}, [isClicked]);

	return (
		<Button
			style={[styles.InteractiveItem, style, position ? styles.specificPosition : {}]}
			onPress={() => {
				setIsClicked(true);
			}}
			activeOpacity={1}
		>
			<LottieView
				source={activeLottieSrc}
				autoPlay
				loop={!isClicked}
				style={styles.lottieView}
				onAnimationFinish={handleAnimationFinish}
				resizeMode="contain"
				duration={duration}
			/>
		</Button>
	);
};

export default InteractiveItem;

const useStyles = createStyle({
	InteractiveItem: {
		width: ({ width }) => getScaledWidth(width),
	},
	lottieView: {
		width: '100%',
		height: '100%',
	},
	specificPosition: {
		position: 'absolute',
		marginLeft: ({ width }) => -getScaledWidth(width) / 2,
		left: ({ position: { left } }) => getScaledWidth(left),
		bottom: ({ position: { bottom } }) => getScaledHeight(bottom),
	},
});

interface PropsType {
	animationObject: AnimationObjectType;
	onClickAnimationObject: AnimationObjectType;
	style?: StylePropertyType;
	position?: {
		left: number;
		bottom: number;
	};
}
