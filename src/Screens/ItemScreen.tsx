import React, { useState } from 'react';
import Clouds from '../components/Clouds';
import InteractiveItem from '../components/InteractiveItem';
import NavigationHeader from '../components/NavigationHeader';
import Scene from '../components/Scene';
import ScreenBase from '../components/ScreenBase';
import Yuna from '../components/Yuna';
import { ScreenProps } from '../constants/globalTypes';
import { useData } from '../providers/Data';

const defaultItemPosition = { left: 1320, bottom: 248 };

const ItemScreen = ({
	route: {
		params: { category, levelIndex, itemIndex },
	},
}: ScreenProps<ParamsType>) => {
	const [isYunaActive, setIsYunaActive] = useState(false);
	const {
		categories,
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
			<Scene lottieFileSrc={scene.animationSrc} audioFile={scene?.backgroundSound} autoPlay />
			<InteractiveItem
				isDraggable={{ isSticky: true }}
				centerBottomPosition={scene.itemPosition ? scene.itemPosition : defaultItemPosition}
				animationObject={item.animationObject}
				onClickAnimationObject={{
					...item.onClickAnimationObject,
					onAnimationFinish: () => {
						setIsYunaActive(true);
					},
				}}
				autoClickTimeout={2000}
			/>
			<Yuna
				variant="item-name-speaker"
				yunaSetVariant={categories[category].levels[levelIndex].yunaSetVariant}
				itemName={item.name}
				isOnClickAnimationActiveState={[isYunaActive, setIsYunaActive]}
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
