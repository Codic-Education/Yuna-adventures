import React from 'react';
import { FlatList, View } from 'react-native';
import SelectableItems from '../components/SelectableItems';
import NavigationHeader from '../components/NavigationHeader';
import { LottieSourceType, ScreenProps } from '../constants/globalTypes';
import { createStyle } from '../providers/Theme';
import Clouds from '../components/Clouds';
import ScreenBase from '../components/ScreenBase';
import { useData } from '../providers/Data';

const ItemSelectorScreen = ({ route: { params }, navigation }: ScreenProps<ParamsType>) => {
	const styles = useStyles();
	const { categories, scenes } = useData();
	const items = Object.values(categories[params.category].items);

	const _renderItem = ({ item }: PropsType) => {
		return (
			<SelectableItems
				thumbnailSrc={item.thumbnailSrc}
				onPress={() => {
					navigation.navigate('ItemScreen', { ...item, scene: scenes[item.scene] });
				}}
			/>
		);
	};

	return (
		<ScreenBase style={styles.ItemSelectorScreen}>
			<NavigationHeader variant="back" />
			<View style={styles.FlatList}>
				<Clouds />
				<FlatList
					data={items}
					renderItem={_renderItem}
					keyExtractor={(item, index) => index.toString()}
					numColumns={3}
					scrollEnabled={false}
				/>
			</View>
		</ScreenBase>
	);
};

export default ItemSelectorScreen;

const useStyles = createStyle({
	ItemSelectorScreen: {
		flex: 1,
		justifyContent: 'flex-end',
		flexDirection: 'column',
	},
	FlatList: {
		alignItems: 'center',
	},
});

interface PropsType {
	item: { thumbnailSrc: LottieSourceType; scene: string };
}

type ParamsType = {
	category: string;
};
