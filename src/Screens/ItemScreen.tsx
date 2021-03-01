import React from 'react';
import Clouds from '../components/Clouds';
import InteractiveItem from '../components/InteractiveItem';
import Scene from '../components/Scene';
import ScreenBase from '../components/ScreenBase';
import { AnimationObjectType, SceneVariantType, ScreenProps } from '../constants/globalTypes';

const ItemScreen = ({
	route: {
		params: { sceneVariant, animationObject, onClickAnimationObject },
	},
}: ScreenProps<ParamsType>) => {
	return (
		<ScreenBase>
			<Clouds />
			<Scene variant={sceneVariant} />
			<InteractiveItem
				animationObject={animationObject}
				onClickAnimationObject={onClickAnimationObject}
			/>
		</ScreenBase>
	);
};

export default ItemScreen;

type ParamsType = {
	sceneVariant: SceneVariantType;
	animationObject: AnimationObjectType;
	onClickAnimationObject: AnimationObjectType;
};
