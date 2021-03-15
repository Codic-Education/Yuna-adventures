import React from 'react';
import Clouds from '../components/Clouds';
import InteractiveItem from '../components/InteractiveItem';
import NavigationHeader from '../components/NavigationHeader';
import Scene from '../components/Scene';
import ScreenBase from '../components/ScreenBase';
import { AnimationObjectType, LottieSourceType, ScreenProps } from '../constants/globalTypes';

const defaultItemPosition = { left: 1320, bottom: 248 };

const ItemScreen = ({
	route: {
		params: { scene, animationObject, onClickAnimationObject },
	},
}: ScreenProps<ParamsType>) => {
	return (
		<ScreenBase>
			<NavigationHeader />
			<Clouds />
			<Scene lottieFileSrc={scene.source} autoPlay />
			<InteractiveItem
				position={scene.itemPosition ? scene.itemPosition : defaultItemPosition}
				animationObject={animationObject}
				onClickAnimationObject={onClickAnimationObject}
				autoPlay={2000}
			/>
		</ScreenBase>
	);
};

export default ItemScreen;

type ParamsType = {
	scene: {
		source: LottieSourceType;
		itemPosition: {
			left: number;
			bottom: number;
		};
	};
	animationObject: AnimationObjectType;
	onClickAnimationObject: AnimationObjectType;
};
