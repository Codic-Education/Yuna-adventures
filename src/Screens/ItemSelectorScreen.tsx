import React, { useEffect, useState } from 'react';
import { Alert, FlatList } from 'react-native';
import SelectableItem, { SelectableItemWidth } from '../components/SelectableItem';
import NavigationHeader from '../components/NavigationHeader';
import { LottieSourceType, ScreenProps } from '../constants/globalTypes';
import { createStyle } from '../providers/Theme';
import Clouds from '../components/Clouds';
import ScreenBase from '../components/ScreenBase';
import { useData } from '../providers/Data';
import { getScaledHeight, getScaledWidth } from '../utilities';
import Paginator from '../components/Paginator';
import LevelPurchaseDialog from '../components/Dialogs/LevelPurchaseDialog';

const flatListDimensions = {
	width: 1069,
	height: 991,
};

const ItemSelectorScreen = ({
	route: {
		params: { category, levelIndex },
	},
	navigation: { navigate },
}: ScreenProps<ParamsType>) => {
	const styles = useStyles();
	const [levelIndexState, setLevelIndexState] = useState(levelIndex ? levelIndex - 1 : 0);
	const { categories, yuna } = useData();
	const [levelData, setLevelData] = useState<any>(categories[category].levels[levelIndexState]);
	const [isLevelPurchaseDialogVisible, setIsLevelPurchaseDialogVisible] = useState(true);
	const [hasBeenPurchased, setHasBeenPurchased] = useState(false);

	useEffect(() => {
		setLevelData(categories[category].levels[levelIndexState]);
		setIsLevelPurchaseDialogVisible(true);
		setHasBeenPurchased(false);
	}, [levelIndexState]);

	useEffect(() => {
		setIsLevelPurchaseDialogVisible(levelData.isPurchased === false);
	}, [levelData.isPurchased]);

	const handlePurchase = () => {
		Alert.alert('Level is unlocked now!');
		setHasBeenPurchased(true);
		//TODO: Update level isPurchase value if purchase process has been succeeded
	};

	const _renderItem = ({ item, index }: RenderItemPropsType) => {
		return (
			<SelectableItem
				thumbnailSrc={item.thumbnailSrc}
				onPress={() => {
					navigate(item.isQuiz ? 'QuizScreen' : 'ItemScreen', {
						category,
						levelIndex: levelIndexState,
						itemIndex: index,
						isNextLevelExist: item.isQuiz
							? levelIndexState + 1 < categories[category].levels.length
							: undefined,
					});
				}}
				lottieViewStyle={item.isQuiz ? styles.yunaStyle : {}}
			/>
		);
	};

	return (
		<ScreenBase>
			<NavigationHeader variant="home" />
			<Clouds />
			<FlatList
				style={styles.flatList}
				contentContainerStyle={styles.contentContainerStyle}
				columnWrapperStyle={styles.rowWrapperStyle}
				data={[
					...(levelData?.items ? levelData?.items : []),
					{
						thumbnailSrc: yuna[levelData.yunaSetVariant]?.win,
						isQuiz: true,
					},
				]}
				renderItem={_renderItem}
				keyExtractor={(_, index) => index.toString()}
				numColumns={2}
				scrollEnabled={false}
			/>
			<>
				{isLevelPurchaseDialogVisible && (
					<LevelPurchaseDialog
						price="1 SEK"
						hasBeenPurchased={hasBeenPurchased}
						onPressPurchaseButton={handlePurchase}
						onPurchaseSuccessAnimationFinish={() =>
							setIsLevelPurchaseDialogVisible(false)
						}
					/>
				)}
			</>
			<Paginator
				state={[levelIndexState, setLevelIndexState]}
				lastIndex={categories[category].levels.length - 1}
			/>
		</ScreenBase>
	);
};

export default ItemSelectorScreen;

const useStyles = createStyle({
	flatList: {
		alignSelf: 'center',
		flexDirection: 'row',
		overflow: 'visible',
	},
	contentContainerStyle: {
		alignContent: 'space-between',
		justifyContent: 'space-between',
		alignSelf: 'center',
		width: getScaledWidth(flatListDimensions.width),
		height: getScaledHeight(flatListDimensions.height),
		paddingTop: 10,
		maxWidth: 2.5 * getScaledWidth(SelectableItemWidth),
		maxHeight: 2.5 * getScaledWidth(SelectableItemWidth),
		//backgroundColor: 'pink',
		overflow: 'visible',
	},
	rowWrapperStyle: {
		justifyContent: 'space-between',
		overflow: 'visible',
		//backgroundColor: 'green',
	},
	yunaStyle: {
		position: 'relative',
		alignSelf: 'center',
		marginTop: 'auto',
		right: 0,
		bottom: 0,
	},
});

interface RenderItemPropsType {
	item: {
		thumbnailSrc: LottieSourceType;
		scene: string;
		isQuiz?: boolean;
	};
	index: number;
}

type ParamsType = {
	category: string;
	levelIndex: number;
};
