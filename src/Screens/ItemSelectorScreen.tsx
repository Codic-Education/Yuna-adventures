import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Platform } from 'react-native';
import RNIAP from 'react-native-iap';
import SelectableItem, { SelectableItemWidth } from '../components/SelectableItem';
import NavigationHeader from '../components/NavigationHeader';
import { LevelType, LottieSourceType, PURCHASE_STATE, ScreenProps } from '../constants/globalTypes';
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
	const { categories, yuna, updateCategories } = useData();
	const levelData: LevelType = categories[category].levels[levelIndexState];
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		levelData.purchaseState === PURCHASE_STATE.PURCHASED && setIsLoading(false);
	}, [levelData.purchaseState]);

	const handlePurchase = async (sku: string) => {
		try {
			await RNIAP.requestPurchase(sku, false);
		} catch (error) {
			setIsLoading(false);
			console.log('HandlePurchaseERROR :', error.code, error.message, error);
		}
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
					...levelData.items,
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
				{!(
					levelData.purchaseState === PURCHASE_STATE.PURCHASED &&
					!levelData.isNewPurchased
				) && (
					<LevelPurchaseDialog
						price={levelData.price}
						purchaseState={levelData.purchaseState}
						isNewPurchased={!!levelData?.isNewPurchased}
						onPressPurchaseButton={() => {
							levelData.productId && handlePurchase(levelData.productId);
							Platform.OS === 'ios' && setIsLoading(true);
						}}
						onPurchaseSuccessAnimationFinish={() => {
							updateCategories({
								[levelData.productId]: { isNewPurchased: false },
							});
						}}
					/>
				)}
			</>

			<Paginator
				state={[levelIndexState, setLevelIndexState]}
				lastIndex={categories[category].levels.length - 1}
			/>
			<>
				{/*TODO CHANGE TO CUSTOM LOADINGINDICATOR*/}
				{isLoading && (
					<ActivityIndicator
						size="large"
						color="white"
						style={styles.activityLoadingStyle}
					/>
				)}
			</>
		</ScreenBase>
	);
};

export default ItemSelectorScreen;

const useStyles = createStyle(({ dimensions: { screenHeight } }) => ({
	flatList: {
		alignSelf: 'center',
		flexDirection: 'row',
	},
	contentContainerStyle: {
		alignContent: 'space-between',
		justifyContent: 'space-between',
		alignSelf: 'center',
		width: getScaledWidth(flatListDimensions.width),
		paddingTop: (screenHeight - getScaledHeight(flatListDimensions.height)) / 2,
		paddingBottom: (screenHeight - getScaledHeight(flatListDimensions.height)) / 2,
		height: '100%',
		maxWidth: 2.5 * getScaledWidth(SelectableItemWidth),
		maxHeight: 2.5 * getScaledWidth(SelectableItemWidth),
		overflow: 'visible',
	},
	rowWrapperStyle: {
		justifyContent: 'space-between',
	},
	yunaStyle: {
		position: 'relative',
		alignSelf: 'center',
		marginTop: 'auto',
		right: 0,
		bottom: 0,
	},
	activityLoadingStyle: {
		backgroundColor: '#0008',
		height: '100%',
		width: '100%',
		// zIndex: 10,
	},
}));

interface RenderItemPropsType {
	item: {
		thumbnailSrc: LottieSourceType;
		scene?: string;
		isQuiz?: boolean;
	};
	index: number;
}

type ParamsType = {
	category: string;
	levelIndex: number;
};
