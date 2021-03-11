import React, { useState, useEffect } from 'react';
import LottieView from 'lottie-react-native';
import Button from './inputs/Button';
import { createStyle } from '../providers/Theme';
import { Audio } from 'expo-av';
import { Sound } from 'expo-av/build/Audio';
import { AnimationObjectType, StylePropertyType } from '../constants/globalTypes';
import { getScaledHeight, getScaledWidth } from '../utilities';

//TODO:Fix animation switching flicker bug "on Android".

const InteractiveItem = ({
	animationObject,
	onClickAnimationObject,
	position,
	autoPlay,
	style,
}: PropsType) => {
	const [isClicked, setIsClicked] = useState(false);
	const [sound, setSound] = useState<Sound | null>(null);
	const [duration, setDuration] = useState(0);

	const activeLottieSrc = isClicked
		? onClickAnimationObject?.animationSrc
			? onClickAnimationObject.animationSrc
			: animationObject.animationSrc
		: animationObject.animationSrc;

	const styles = useStyles({
		width: activeLottieSrc?.w,
		height: activeLottieSrc?.h,
		position,
	});

	const handleAnimationFinish = !isClicked
		? () => {}
		: (isCancelled: boolean) => {
				!isCancelled && setIsClicked(false);
		  };

	const playSound = async () => {
		const activeSoundSrc = isClicked
			? onClickAnimationObject?.soundSrc
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
		const timeOut =
			autoPlay && typeof autoPlay === 'number'
				? setTimeout(() => {
						setIsClicked(true);
				  }, autoPlay)
				: null;
		return () => {
			timeOut && clearTimeout(timeOut);
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
				onClickAnimationObject && setIsClicked(true);
			}}
			activeOpacity={1}
		>
			<LottieView
				source={activeLottieSrc}
				autoPlay={isClicked || autoPlay ? true : false}
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
		aspectRatio: ({ width, height }) => width / height,
	},
	lottieView: {
		width: '100%',
		height: '100%',
	},
	specificPosition: {
		position: 'absolute',
		marginLeft: ({ width }) => -getScaledWidth(width) / 2,
		left: ({ position }) => (position?.left ? getScaledWidth(position.left) : 'auto'),
		bottom: ({ position }) => (position?.bottom ? getScaledHeight(position.bottom) : 'auto'),
	},
});

export interface PropsType {
	animationObject: AnimationObjectType;
	onClickAnimationObject?: AnimationObjectType | undefined;
	style?: StylePropertyType;
	position?: {
		left?: number;
		bottom?: number;
	};
	autoPlay?: boolean | number;
}
