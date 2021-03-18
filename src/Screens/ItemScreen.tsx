import React from 'react';
import Clouds from '../components/Clouds';
import InteractiveItem from '../components/InteractiveItem';
import NavigationHeader from '../components/NavigationHeader';
import Scene from '../components/Scene';
import ScreenBase from '../components/ScreenBase';
import { ScreenProps } from '../constants/globalTypes';
import { useData } from '../providers/Data';

const defaultItemPosition = { left: 1320, bottom: 248 };

const ItemScreen = ({
	route: {
		params: { category, levelIndex, itemIndex },
	},
}: ScreenProps<ParamsType>) => {
	const {
		categories: {
			[category]: { levels },
		},
		scenes,
	} = useData();
	const item = levels[levelIndex].items[itemIndex];
	const scene = scenes[item.scene];

	return (
		<ScreenBase>
			<NavigationHeader />
			<Clouds />
			<Scene
				lottieFileSrc={scene.animationSrc}
				backgroundSound={scene?.backgroundSound}
				autoPlay
			/>

			<InteractiveItem
				centerBottomPosition={scene.itemPosition ? scene.itemPosition : defaultItemPosition}
				animationObject={item.animationObject}
				onClickAnimationObject={item.onClickAnimationObject}
				autoClickTimeout={2000}
			/>
		</ScreenBase>
	);
};

export default ItemScreen;

type ParamsType = {
	category: string;
	levelIndex: number;
	itemIndex: 0 | 1 | 2 | 3;
};
