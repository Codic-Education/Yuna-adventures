import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import Clouds from '../components/Clouds';
import IconButton from '../components/inputs/IconButton';
import InteractiveItem, { InteractiveItemPropsType } from '../components/InteractiveItem';
import NavigationHeader from '../components/NavigationHeader';
import Scene from '../components/Scene';
import ScreenBase from '../components/ScreenBase';
import StarsProgressIndicator from '../components/StarsProgressIndicator';
import { LottieSourceType, QuizProgressValueType, ScreenProps } from '../constants/globalTypes';
import { createStyle } from '../providers/Theme';
import nextLevelArrow from '../assets/animations/next-level-arrow.json';
import { StackActions } from '@react-navigation/native';
import { getRandomNumbersArray } from '../utilities';
import Yuna from '../components/Yuna';

const QuizScreen = ({
	route: {
		params: { scene, items, nextLevelData },
	},
	navigation: { dispatch },
}: ScreenProps<ParamsType>) => {
	const styles = useStyles();
	const [randomIndexes] = useState(getRandomNumbersArray(0, 2));
	const [progress, setProgress] = useState<QuizProgressValueType>(0);
	const sceneRef = useRef(null);

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
			<StarsProgressIndicator progressValue={progress} />
			<View style={styles.itemsContainer}>
				{items.map((item, i) => (
					<View key={i} style={styles.itemWrapper}>
						<InteractiveItem
							{...item}
							centerBottomPosition={{ bottom: i === 1 ? 102 : 309 }}
							onClickAnimationObject={
								i === randomIndexes[progress]
									? item.onClickAnimationObject
									: undefined
							}
							onPress={() => {
								i === randomIndexes[progress] &&
									setProgress(
										(current): QuizProgressValueType =>
											current < 3 ? current + 1 : current
									);
							}}
						/>
					</View>
				))}
			</View>
			<Yuna
				variant="quiz"
				progress={progress}
				itemsData={randomIndexes.map((i) => ({
					soundSrc: items[i].onClickAnimationObject?.soundSrc,
					name: items[i].name,
				}))}
			/>
			<>
				{progress === 3 && nextLevelData && (
					<IconButton
						onPress={() =>
							dispatch(StackActions.replace(nextLevelData[0], nextLevelData[1]))
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

const useStyles = createStyle({
	itemsContainer: {
		flex: 1,
		flexDirection: 'row',
	},
	itemWrapper: {
		flex: 1,
		alignItems: 'center',
	},
	nextLevelButton: {
		position: 'absolute',
		right: 10,
		bottom: 10,
	},
	nextLevelArrow: { width: 70 },
});

type ParamsType = {
	scene: {
		animationSrc: LottieSourceType;
	};
	items: [InteractiveItemObjectType];
	nextLevelData: [
		string,
		{
			category: string;
			levelIndex: number;
		}
	];
};

interface InteractiveItemObjectType extends InteractiveItemPropsType {
	name: object;
}
