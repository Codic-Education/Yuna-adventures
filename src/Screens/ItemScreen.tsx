import React from 'react';
import Clouds from '../components/Clouds';
import InteractiveItem from '../components/InteractiveItem';
import Scene from '../components/Scene';
import ScreenBase from '../components/ScreenBase';
import { AnimationObjectType, LottieSourceType, ScreenProps } from '../constants/globalTypes';

const ItemScreen = ({
	route: {
		params: { scene, animationObject, onClickAnimationObject },
	},
}: ScreenProps<ParamsType>) => {
	return (
		<ScreenBase>
			<Clouds />
			<Scene lottieFileSrc={scene.source} />
			<InteractiveItem
				position={scene.itemPosition}
				animationObject={animationObject}
				onClickAnimationObject={onClickAnimationObject}
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
