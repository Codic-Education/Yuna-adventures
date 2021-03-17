import React, { useState, useEffect, useRef } from 'react';
import LottieView from 'lottie-react-native';
import Button from './inputs/Button';
import { createStyle } from '../providers/Theme';
import { Audio } from 'expo-av';
import { Sound } from 'expo-av/build/Audio';
import { AnimationObjectType, StylePropertyType } from '../constants/globalTypes';
import { getScaledHeight, getScaledWidth } from '../utilities';

const InteractiveItem = ({
	animationObject,
	onClickAnimationObject,
	centerBottomPosition,
	autoClickTimeout = false,
	renderAsClicked = false,
	onPress,
	style,
	disabled,
}: InteractiveItemPropsType) => {
	const [isOnClickAnimationActive, setIsOnClickAnimationActive] = useState(
		renderAsClicked ? true : false
	);
	const [sounds] = useState<[Sound, Sound]>([new Audio.Sound(), new Audio.Sound()]);
	const [durations, setDurations] = useState([0, 0]);
	const animationRef = useRef(null);
	const onClickAnimationRef = useRef(null);
	const [isReady, setIsReady] = useState(false);

	const activeLottieSrc = isOnClickAnimationActive
		? onClickAnimationObject?.animationSrc
			? onClickAnimationObject.animationSrc
			: animationObject.animationSrc
		: animationObject.animationSrc;

	const styles = useStyles({
		width: activeLottieSrc?.w,
		height: activeLottieSrc?.h,
		position: centerBottomPosition,
	});

	const loadSounds = async () => {
		const soundsSrc = [animationObject?.soundSrc, onClickAnimationObject?.soundSrc];
		const durations = [];
		for (let i = 0; i < sounds.length; i++) {
			if (soundsSrc[i]) {
				await sounds[i].loadAsync(soundsSrc[i]);
			}
			const duration = (await sounds[i].getStatusAsync()).durationMillis;
			durations.push(duration || 0);
		}
		setDurations(durations);
		setIsReady(true);
	};
	const loadConfigurations = () => {
		!animationObject.disableSoundLoop && sounds[0]._loaded && sounds[0].setIsLoopingAsync(true);
	};

	const play = async () => {
		if (isReady) {
			if (isOnClickAnimationActive) {
				sounds[0]._loaded && sounds[0]?.stopAsync();
				sounds[1]._loaded && sounds[1]?.playAsync();
				onClickAnimationRef.current?.reset();
				onClickAnimationRef.current?.play();
			} else {
				sounds[1]._loaded && sounds[1]?.stopAsync();
				sounds[0]._loaded && sounds[0]?.playAsync();
				animationRef.current?.reset();
				animationRef.current?.play();
			}
		}
	};

	const handleOnClickAnimationFinish = (isCancelled: boolean) => {
		if (!isCancelled && isOnClickAnimationActive) {
			onPress && onPress();
			setIsOnClickAnimationActive(false);
		}
	};

	const unloadSounds = () => {
		for (let i = 0; i < sounds.length; i++) {
			sounds[i]._loaded && sounds[i].unloadAsync();
		}
	};

	useEffect(() => {
		loadSounds();
		return () => {
			unloadSounds();
		};
	}, [animationObject.soundSrc, onClickAnimationObject?.soundSrc]);

	useEffect(() => {
		let timeOut = null;
		if (isReady) {
			loadConfigurations();
			timeOut =
				typeof autoClickTimeout === 'number'
					? setTimeout(() => {
							setIsOnClickAnimationActive(true);
					  }, autoClickTimeout)
					: null;
		}
		return () => {
			timeOut && clearTimeout(timeOut);
		};
	}, [isReady]);

	useEffect(() => {
		play();
	}, [isOnClickAnimationActive, isReady]);

	return (
		<Button
			style={[
				styles.InteractiveItem,
				style,
				centerBottomPosition ? styles.specificPosition : {},
			]}
			onPress={() => {
				if (!disabled) {
					onClickAnimationObject && setIsOnClickAnimationActive(true);
					onPress && !onClickAnimationObject && onPress();
				}
			}}
			activeOpacity={1}
		>
			<LottieView
				ref={animationRef}
				source={animationObject.animationSrc}
				style={[styles.lottieView, isOnClickAnimationActive && styles.hiddenAnimation]}
				resizeMode="contain"
				duration={durations[0]}
			/>
			<>
				{onClickAnimationObject?.animationSrc && (
					<LottieView
						ref={onClickAnimationRef}
						source={onClickAnimationObject?.animationSrc}
						loop={false}
						style={[
							styles.lottieView,
							!isOnClickAnimationActive && styles.hiddenAnimation,
						]}
						onAnimationFinish={handleOnClickAnimationFinish}
						resizeMode="contain"
						duration={durations[1]}
					/>
				)}
			</>
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
		position: 'absolute',
		top: 0,
		left: 0,
	},
	specificPosition: {
		position: 'absolute',
		marginLeft: ({ width }) => -getScaledWidth(width) / 2,
		left: ({ position }) => (position?.left ? getScaledWidth(position.left) : 'auto'),
		bottom: ({ position }) => (position?.bottom ? getScaledHeight(position.bottom) : 'auto'),
	},
	hiddenAnimation: { opacity: 0 },
});

export interface InteractiveItemPropsType {
	animationObject: AnimationObjectType;
	onClickAnimationObject?: AnimationObjectType;
	style?: StylePropertyType;
	centerBottomPosition?: {
		left?: number;
		bottom?: number;
	};
	autoClickTimeout?: boolean | number;
	renderAsClicked?: boolean;
	onPress?: () => void;
	disabled?: boolean;
}
