import React, { useEffect, useState } from 'react';
import { FlatList, Platform } from 'react-native';
import * as RNIAP from 'react-native-iap';
import SelectableItem, { SelectableItemWidth } from '../components/SelectableItem';
import NavigationHeader from '../components/NavigationHeader';
import { LottieSourceType, ScreenProps } from '../constants/globalTypes';
import { createStyle } from '../providers/Theme';
import Clouds from '../components/Clouds';
import ScreenBase from '../components/ScreenBase';
import { addToStoredPurchasedLevelProductsIds, useData } from '../providers/Data';
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
	}, [levelData]);

	//Note: This useEffect is used to update a paid level state after purchasing process sucess.
	useEffect(() => {
		if (!levelData.isPurchased && !isLevelPurchaseDialogVisible) {
			updateCategories([levelData.productId]);
			addToStoredPurchasedLevelProductsIds([levelData.productId]);
			//Done
		}
	}, [isLevelPurchaseDialogVisible]);

	const handlePurchase = async (sku: string) => {
		try {
			await RNIAP.requestPurchase(sku, false)
				.then(async (result: any) => {
					if (Platform.OS === 'ios') {
						await RNIAP.finishTransactionIOS(result.transactionId);
						result.transactionId && setHasBeenPurchased(true);
					} else if (Platform.OS === 'android') {
						await RNIAP.finishTransaction(result, true);
					}
				})
				.catch((err) => {
					console.log(`IAP REQUEST PURCHASE ERROR: ${err.code}`, err.message);
				});
		} catch (error) {
			console.warn('IAP ERROR ', error.code, error.message, error);
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
						price="10kr"
						hasBeenPurchased={hasBeenPurchased}
						onPressPurchaseButton={() => {
							handlePurchase(levelData.productId);
						}}
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
}));

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
