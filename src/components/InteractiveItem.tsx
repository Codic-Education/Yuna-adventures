import React, { useState, useEffect, useRef, Dispatch, SetStateAction } from 'react';
import LottieView from 'lottie-react-native';
import Button from './inputs/Button';
import { createStyle } from '../providers/Theme';
import { Audio } from 'expo-av';
import { Sound } from 'expo-av/build/Audio';
import { AnimationObjectType } from '../constants/globalTypes';
import { calcDesiredSpeed, getScaledHeight, getScaledWidth } from '../utilities';
import { StyleProp, ViewStyle } from 'react-native';

const InteractiveItem = ({
	isOnClickAnimationActiveState,
	animationObject,
	onClickAnimationObject,
	centerBottomPosition,
	autoClickTimeout = false,
	renderAsClicked = false,
	style,
	onPressStart,
	disabled,
}: InteractiveItemPropsType) => {
	const [isOnClickAnimationActive, setIsOnClickAnimationActive] =
		isOnClickAnimationActiveState || useState();

	const [sounds] = useState<[Sound, Sound]>([new Audio.Sound(), new Audio.Sound()]);
	const [durations, setDurations] = useState([0, 0]);
	const animationRef = useRef(null);
	const onClickAnimationRef = useRef(null);
	const [isReady, setIsReady] = useState(false);
	const [isAutoClickTimeoutActive, setIsAutoClickTimeoutActive] = useState(!!autoClickTimeout);

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

	useEffect(() => {
		setIsAutoClickTimeoutActive(renderAsClicked ? true : false);
	}, []);

	useEffect(() => {
		loadSounds();
		return () => {
			unloadSounds();
		};
	}, [animationObject.soundSrc, onClickAnimationObject?.soundSrc]);

	useEffect(() => {
		let unsubscribeAutoClickTimeout: null | NodeJS.Timeout = null;
		if (isReady) {
			loadConfigurations();
			unsubscribeAutoClickTimeout =
				typeof autoClickTimeout === 'number'
					? setTimeout(() => {
							setIsAutoClickTimeoutActive(false);
							setIsOnClickAnimationActive(true);
					  }, autoClickTimeout)
					: null;
		}
		return () => {
			unsubscribeAutoClickTimeout && clearTimeout(unsubscribeAutoClickTimeout);
		};
	}, [isReady]);

	useEffect(() => {
		if (!isAutoClickTimeoutActive) {
			play();
		}
	}, [isOnClickAnimationActive, isAutoClickTimeoutActive, isReady, animationObject.paused]);

	const handleAnimationFinish = (isCancelled: boolean) => {
		if (!isCancelled) {
			animationObject.onAnimationFinish && animationObject.onAnimationFinish();
		}
	};

	const handleOnClickAnimationFinish = (isCancelled: boolean) => {
		if (!isCancelled && isOnClickAnimationActive) {
			onClickAnimationObject?.onAnimationFinish && onClickAnimationObject.onAnimationFinish();
			setIsOnClickAnimationActive(false);
		}
	};

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
		try {
			setDurations(durations);
			setIsReady(true);
		} catch (error) {
			console.log(error);
		}
	};

	const unloadSounds = () => {
		for (let i = 0; i < sounds.length; i++) {
			sounds[i]._loaded && sounds[i].unloadAsync();
		}
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
				!animationObject.paused && animationRef.current?.play();
			}
		}
	};

	return (
		<Button
			style={[
				styles.InteractiveItem,
				centerBottomPosition ? styles.specificPosition : {},
				style,
			]}
			onPress={() => {
				onPressStart && onPressStart();
				onClickAnimationObject && setIsOnClickAnimationActive(true);
				if (
					onClickAnimationObject?.onAnimationFinish &&
					!onClickAnimationObject.animationSrc
				) {
					onClickAnimationObject.onAnimationFinish();
				}
			}}
			activeOpacity={0.97}
			disablePressSound
			disabled={disabled}
		>
			<LottieView
				ref={animationRef}
				source={animationObject.animationSrc}
				style={[styles.lottieView, isOnClickAnimationActive && styles.hiddenAnimation]}
				resizeMode="contain"
				speed={calcDesiredSpeed(animationObject.animationSrc, durations[0])}
				loop={animationObject.disableAnimationLoop ? false : true}
				onAnimationFinish={handleAnimationFinish}
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
						speed={calcDesiredSpeed(onClickAnimationObject?.animationSrc, durations[1])}
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
	isOnClickAnimationActiveState?: [boolean, Dispatch<SetStateAction<boolean>>];
	animationObject: AnimationObjectExtendedType;
	onClickAnimationObject?: AnimationObjectType;
	style?: StyleProp<ViewStyle>;
	centerBottomPosition?: {
		left?: number;
		bottom?: number;
	};
	autoClickTimeout?: boolean | number;
	renderAsClicked?: boolean;
	onPressStart?: () => void;
	disabled?: boolean;
}

interface AnimationObjectExtendedType extends AnimationObjectType {
	disableAnimationLoop?: boolean;
	paused?: boolean;
}
