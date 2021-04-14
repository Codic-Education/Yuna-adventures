import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import Clouds from '../components/Clouds';
import IconButton from '../components/inputs/IconButton';
import InteractiveItem from '../components/InteractiveItem';
import NavigationHeader from '../components/NavigationHeader';
import Scene from '../components/Scene';
import ScreenBase from '../components/ScreenBase';
import StarsProgressIndicator from '../components/StarsProgressIndicator';
import { QuizProgressValueType, ScreenProps } from '../constants/globalTypes';
import { createStyle } from '../providers/Theme';
import nextLevelArrow from '../assets/animations/next-level-arrow.json';
import { StackActions } from '@react-navigation/native';
import { getRandomNumbersArray } from '../utilities';
import Yuna from '../components/Yuna';
import { YunaStatusType } from '../components/Yuna/Quiz';
import { useData } from '../providers/Data';

const QuizScreen = ({
	route: {
		params: { category, levelIndex, isNextLevelExist },
	},
	navigation: { dispatch },
}: ScreenProps<ParamsType>) => {
	const styles = useStyles();
	const [yunaState, setYunaState] = useState<YunaStatusType>('ready');
	const { categories, scenes } = useData();
	const [randomIndexes] = useState(getRandomNumbersArray(0, 2));
	const [progress, setProgress] = useState<QuizProgressValueType>(0);
	const [isThereActiveItem, setIsThereActiveItem] = useState(false);
	const sceneRef = useRef(null);
	const scene = scenes[categories[category].levels[levelIndex].quiz.scene];
	const items = categories[category].levels[levelIndex].items;

	const checkAnswer = (itemIndex: 0 | 1 | 2) => {
		if (itemIndex === randomIndexes[progress]) {
			setProgress((current) => {
				if (current < 3) {
					progress === 2 ? setYunaState('win') : setYunaState('correct-answer');
					return current + 1;
				}
			});
		} else {
			setYunaState('wrong-answer');
		}
	};

	useEffect(() => {
		progress === 3 && sceneRef.current?.play();
	}, [progress]);

	return (
		<ScreenBase>
			<NavigationHeader />
			<Clouds />
			<Scene
				ref={sceneRef}
				lottieFileSrc={scene.animationSrc}
				autoPlay={progress === 3}
				loop={false}
			/>
			<View style={styles.itemsContainer}>
				{items.map((item, i) => (
					<View key={i} style={styles.itemWrapper}>
						<InteractiveItem
							{...item}
							animationObject={{
								...item.animationObject,
								paused: yunaState !== 'waiting',
							}}
							centerBottomPosition={{ bottom: i === 1 ? 102 : 309 }}
							onClickAnimationObject={{
								...item.onClickAnimationObject,
								onAnimationFinish: () => {
									checkAnswer(i);
									setIsThereActiveItem(false);
								},
							}}
							onPressStart={() => {
								setIsThereActiveItem(true);
							}}
							disabled={yunaState !== 'waiting' || isThereActiveItem}
						/>
					</View>
				))}
			</View>
			{yunaState === 'informing' || yunaState === 'ready' ? (
				<View style={styles.overlay} />
			) : (
				<></>
			)}
			<StarsProgressIndicator progressValue={progress} />
			<Yuna
				yunaState={[yunaState, setYunaState]}
				variant="quiz"
				yunaSetVariant={categories[category].levels[levelIndex].yunaSetVariant}
				progress={progress}
				itemsData={randomIndexes.map((i) => ({
					soundSrc: items[i].onClickAnimationObject?.soundSrc,
					name: items[i].name,
				}))}
			/>
			<>
				{progress === 3 && isNextLevelExist && (
					<IconButton
						onPress={() =>
							dispatch(
								StackActions.replace('ItemSelectorScreen', {
									category,
									levelIndex: levelIndex + 2,
								})
							)
						}
						lottieFileSrc={nextLevelArrow}
						style={styles.nextLevelButton}
						lottieViewStyle={styles.nextLevelArrow}
					/>
				)}
			</>
		</ScreenBase>
	);
};

export default QuizScreen;

const useStyles = createStyle(({ palette: { color0, type } }) => ({
	itemsContainer: {
		flex: 1,
		flexDirection: 'row',
	},
	itemWrapper: {
		flex: 1,
		alignItems: 'center',
	},
	overlay: {
		width: '100%',
		height: '100%',
		position: 'absolute',
		top: 0,
		left: 0,
		backgroundColor: `${color0[type].toString()}25`,
	},
	nextLevelButton: {
		position: 'absolute',
		right: 10,
		bottom: 10,
	},
	nextLevelArrow: { width: 70 },
}));

type ParamsType = {
	category: string;
	levelIndex: number;
	isNextLevelExist: boolean;
};
