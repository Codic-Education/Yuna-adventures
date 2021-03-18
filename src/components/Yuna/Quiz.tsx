import { AVPlaybackSource } from 'expo-av/build/AV';
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { QuizProgressValueType } from '../../constants/globalTypes';
import { useData } from '../../providers/Data';
import { useIntl, LanguagesCodesType } from '../../providers/Intl';
import { createStyle } from '../../providers/Theme';
import InteractiveItem from '../InteractiveItem';
import LottieView from 'lottie-react-native';
import { getScaledWidth } from '../../utilities';
import Button from '../inputs/Button';
import { Audio } from 'expo-av';
import wrongAnswerSoundSrc from '../../assets/sounds/wrong-answer.wav';
import correctAnswerSoundSrc from '../../assets/sounds/correct-answer.wav';
import completeLevelSoundSrc from '../../assets/sounds/complete-level.wav';

const informingDelay = 2000;

const Quiz = ({ progress, itemsData, yunaSetVariant, yunaState }: QuizPropsType) => {
	const animationsRefs = [useRef(null), useRef(null), useRef(null)];
	const [wrongAnswerRef, correctAnswerRef, completeLevelRef] = animationsRefs;
	const [sounds] = useState([new Audio.Sound(), new Audio.Sound(), new Audio.Sound()]);
	const [wrongAnswerSound, correctAnswerSound, completeLevelSound] = sounds;
	const [[wrongAnswerSoundDuration, correctAnswerSoundDuration], setDurations] = useState<any>([
		0,
		0,
	]);

	const {
		yuna: { [yunaSetVariant]: yunaSet },
	} = useData();
	const { lang } = useIntl();
	const [yunaStatus, setYunaStatus] = yunaState || useState<YunaStatusType>('waiting');
	const [isYunaInforming, setIsYunaInforming] = useState(false);
	const styles = useStyles({
		yunaWaitingWidth: yunaSet.waiting.w,
		yunaWrongAnswerWidth: yunaSet.wrongAnswer.w,
		yunaCorrectAnswerWidth: yunaSet.correctAnswer.w,
		yunaWinWidth: yunaSet.win.w,
	});

	const loadSounds = async () => {
		const durations = [];
		await wrongAnswerSound.loadAsync(wrongAnswerSoundSrc);
		durations.push((await wrongAnswerSound.getStatusAsync()).durationMillis);
		await correctAnswerSound.loadAsync(correctAnswerSoundSrc);
		durations.push((await correctAnswerSound.getStatusAsync()).durationMillis);
		await completeLevelSound.loadAsync(completeLevelSoundSrc);
		setDurations(durations);
	};

	const stopSounds = () => {
		sounds.map(async (sound) => {
			await sound.stopAsync();
			return sound;
		});
	};

	const unloadSounds = () => {
		sounds.map(async (sound) => {
			await sound.unloadAsync();
			return sound;
		});
	};

	const playAnimationWithSound = () => {
		let targetSound = null;
		let targetAnimation = null;
		switch (yunaStatus) {
			case 'wrong-answer':
				targetSound = wrongAnswerSound;
				targetAnimation = wrongAnswerRef;
				break;
			case 'correct-answer':
				targetSound = correctAnswerSound;
				targetAnimation = correctAnswerRef;
				break;
			case 'win':
				targetSound = completeLevelSound;
				targetAnimation = completeLevelRef;

				break;
		}
		targetSound && targetSound.playAsync();
		targetAnimation && targetAnimation.current?.play();
	};

	useEffect(() => {
		loadSounds();
		setTimeout(() => {
			setYunaStatus('informing');
		}, informingDelay);
		return unloadSounds;
	}, []);

	useEffect(() => {
		if (yunaStatus === 'informing') {
			setIsYunaInforming(true);
		} else if (yunaStatus !== 'waiting') {
			stopSounds();
			playAnimationWithSound();
		}
	}, [yunaStatus]);

	return (
		<>
			<InteractiveItem
				animationObject={{
					animationSrc: yunaSet.talking,
					soundSrc: itemsData[progress]?.name[lang],
					disableSoundLoop: true,
					disableAnimationLoop: true,
					onAnimationFinish: () => {
						setYunaStatus('waiting');
						setIsYunaInforming(false);
					},
				}}
				onClickAnimationObject={{
					animationSrc: yunaSet.sounding,
					soundSrc: itemsData[progress]?.soundSrc,
				}}
				style={[styles.yunaPosition, yunaStatus !== 'informing' && styles.hidden]}
				renderAsClicked
				autoClickTimeout={informingDelay}
				isOnClickAnimationActiveState={[isYunaInforming, setIsYunaInforming]}
			/>
			<LottieView
				ref={wrongAnswerRef}
				source={yunaSet.wrongAnswer}
				style={[
					styles.yunaPosition,
					styles.yunaWrongAnswer,
					yunaStatus !== 'wrong-answer' && styles.hidden,
				]}
				onAnimationFinish={() => setYunaStatus('waiting')}
				resizeMode="contain"
				loop={false}
				duration={wrongAnswerSoundDuration}
			/>
			<LottieView
				ref={correctAnswerRef}
				source={yunaSet.correctAnswer}
				style={[
					styles.yunaPosition,
					styles.yunaCorrectAnswer,

					yunaStatus !== 'correct-answer' && styles.hidden,
				]}
				onAnimationFinish={() => {
					setYunaStatus('waiting');
					setTimeout(() => setYunaStatus('informing'), 1000);
				}}
				resizeMode="contain"
				loop={false}
				duration={correctAnswerSoundDuration}
			/>
			<LottieView
				ref={completeLevelRef}
				source={yunaSet.win}
				style={[styles.yunaPosition, styles.yunaWin, yunaStatus !== 'win' && styles.hidden]}
				autoPlay
				resizeMode="contain"
			/>
			<Button
				style={[styles.yunaPosition, yunaStatus !== 'waiting' && styles.hidden]}
				onPress={() => {
					setYunaStatus('informing');
				}}
			>
				<LottieView
					source={yunaSet.waiting}
					style={[styles.yunaWaiting]}
					autoPlay
					resizeMode="contain"
				/>
			</Button>
		</>
	);
};

export default Quiz;

const useStyles = createStyle({
	yunaPosition: { position: 'absolute', bottom: 0, left: 0 },
	yunaWaiting: { width: ({ yunaWaitingWidth }) => getScaledWidth(yunaWaitingWidth) },
	yunaWrongAnswer: { width: ({ yunaWrongAnswerWidth }) => getScaledWidth(yunaWrongAnswerWidth) },
	yunaCorrectAnswer: {
		width: ({ yunaCorrectAnswerWidth }) => getScaledWidth(yunaCorrectAnswerWidth),
	},
	yunaWin: {
		width: ({ yunaWinWidth }) => getScaledWidth(yunaWinWidth),
	},
	hidden: { width: 0, height: 0 },
});

export interface QuizPropsType {
	progress: QuizProgressValueType;
	yunaSetVariant: string;
	yunaState?: [YunaStatusType, Dispatch<SetStateAction<YunaStatusType>>];
	itemsData:
		| [
				{
					soundSrc: AVPlaybackSource | undefined;
					name: {
						[key in LanguagesCodesType]: AVPlaybackSource;
					};
				}
		  ]
		| any;
}

export type YunaStatusType = 'waiting' | 'informing' | 'correct-answer' | 'wrong-answer' | 'win';
