import React, { useState, useEffect } from 'react';
import LottieView from 'lottie-react-native';
import Button from './inputs/Button';
import { createStyle } from '../providers/Theme';
import { Audio } from 'expo-av';
import { Sound } from 'expo-av/build/Audio';
import { AnimationObjectType, StylePropertyType } from '../constants/globalTypes';
import { getScaledHeight, getScaledWidth } from '../utilities';

//TODO:Fix animation switching flicker bug "on Android".
//TODO:change position to centerBottomPosition.

const InteractiveItem = ({
	animationObject,
	onClickAnimationObject,
	position,
	autoPlay,
	onPress,
	style,
	disabled,
}: PropsType) => {
	const [isOnClickAnimationActive, setIsOnClickAnimationActive] = useState(false);
	const [sound, setSound] = useState<Sound | null>(null);
	const [duration, setDuration] = useState(0);

	const activeLottieSrc = isOnClickAnimationActive
		? onClickAnimationObject?.animationSrc
			? onClickAnimationObject.animationSrc
			: animationObject.animationSrc
		: animationObject.animationSrc;

	const styles = useStyles({
		width: activeLottieSrc?.w,
		height: activeLottieSrc?.h,
		position,
	});

	const handleAnimationFinish = (isCancelled: boolean) => {
		if (!isCancelled && isOnClickAnimationActive) {
			onPress && onPress();
			setIsOnClickAnimationActive(false);
		}
	};

	const playSound = async () => {
		const activeSoundSrc = isOnClickAnimationActive
			? onClickAnimationObject?.soundSrc
			: animationObject.soundSrc;

		if (activeSoundSrc) {
			const { sound } = await Audio.Sound.createAsync(activeSoundSrc);
			setDuration((await sound.getStatusAsync()).durationMillis);
			sound.playAsync();
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
						setIsOnClickAnimationActive(true);
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
	}, [isOnClickAnimationActive]);

	return (
		<Button
			style={[styles.InteractiveItem, style, position ? styles.specificPosition : {}]}
			onPress={() => {
				if (!disabled) {
					onClickAnimationObject && setIsOnClickAnimationActive(true);
					onPress && !onClickAnimationObject && onPress();
				}
			}}
			activeOpacity={1}
		>
			<LottieView
				source={activeLottieSrc}
				autoPlay={isOnClickAnimationActive || autoPlay ? true : false}
				loop={!isOnClickAnimationActive}
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
	onPress?: () => void;
	disabled?: boolean;
}
