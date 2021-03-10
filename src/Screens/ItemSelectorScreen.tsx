import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import SelectableItem, { SelectableItemWidth } from '../components/SelectableItem';
import NavigationHeader from '../components/NavigationHeader';
import { LottieSourceType, ScreenProps } from '../constants/globalTypes';
import { createStyle } from '../providers/Theme';
import Clouds from '../components/Clouds';
import ScreenBase from '../components/ScreenBase';
import { useData } from '../providers/Data';
import { getScaledHeight, getScaledWidth } from '../utilities';

const flatListDimensions = {
	width: 1069,
	height: 991,
};

const ItemSelectorScreen = ({
	route: {
		params: { category, levelIndex },
	},
	navigation,
}: ScreenProps<ParamsType>) => {
	const styles = useStyles();
	const [levelIndexState, setLevelIndexState] = useState(levelIndex ? levelIndex - 1 : 0);
	const { categories, scenes, yuna } = useData();
	const [items, setItems] = useState<any>([]);

	useEffect(() => {
		setItems([
			...categories[category].items[levelIndexState].items,
			{
				thumbnailSrc:
					yuna[categories[category].items[levelIndexState].quiz.thumbnailYunaVariant],
				screen: 'QuizScreen',
			},
		]);
	}, []);

	const _renderItem = ({ item }: RenderItemPropsType) => {
		return (
			<SelectableItem
				thumbnailSrc={item.thumbnailSrc}
				onPress={() => {
					navigation.navigate(item.screen ? 'QuizScreen' : 'ItemScreen', {
						...item,
						scene: scenes[item.scene],
					});
				}}
				lottieViewStyle={item.screen ? styles.yunaStyle : {}}
			/>
		);
	};

	return (
		<ScreenBase>
			<NavigationHeader variant="back" />
			<Clouds />
			<FlatList
				style={styles.flatList}
				contentContainerStyle={styles.contentContainerStyle}
				columnWrapperStyle={styles.columnWrapperStyle}
				data={items}
				renderItem={_renderItem}
				keyExtractor={(_, index) => index.toString()}
				numColumns={2}
				scrollEnabled={false}
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
		maxWidth: 2.5 * getScaledWidth(SelectableItemWidth),
		maxHeight: 2.5 * getScaledWidth(SelectableItemWidth),
	},
	columnWrapperStyle: {
		justifyContent: 'space-between',
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
		screen?: string;
	};
}

type ParamsType = {
	category: string;
	levelIndex: number;
};
