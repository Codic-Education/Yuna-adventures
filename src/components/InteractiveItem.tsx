import React, { useState, useEffect } from 'react';
import LottieView from 'lottie-react-native';
import Button from './inputs/Button';
import { createStyle } from '../providers/Theme';
import { Audio } from 'expo-av';
import { Sound } from 'expo-av/build/Audio';
import { AnimationObjectType } from '../constants/globalTypes';
import { getScaledWidth } from '../utilities';

const InteractiveItem = ({ animationObject, onClickAnimationObject }: PropsType) => {
	const [isClicked, setIsClicked] = useState(true);
	const [sound, setSound] = useState<Sound | null>(null);
	const [duration, setDuration] = useState(0);

	const activeLottieSrc = isClicked
		? onClickAnimationObject.animationSrc
		: animationObject.animationSrc;

	const styles = useStyles({
		width: activeLottieSrc.w,
		height: activeLottieSrc.h,
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
		playSound();
		return () => {
			sound?.stopAsync();
			sound?.unloadAsync();
		};
	}, [isClicked]);

	return (
		<Button
			style={styles.InteractiveItem}
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
		aspectRatio: ({ width, height }) => width / height,
	},
	lottieView: {
		width: '100%',
		height: '100%',
	},
});

interface PropsType {
	animationObject: AnimationObjectType;
	onClickAnimationObject: AnimationObjectType;
}
