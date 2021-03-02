import React from 'react';
import Clouds from '../components/Clouds';
import InteractiveItem from '../components/InteractiveItem';
import Scene from '../components/Scene';
import ScreenBase from '../components/ScreenBase';
import { AnimationObjectType, LottieSourceType, ScreenProps } from '../constants/globalTypes';
import { createStyle } from '../providers/Theme';
import { getScaledWidth, getScaledHeight } from '../utilities';

const ItemScreen = ({
	route: {
		params: { scene, animationObject, onClickAnimationObject },
	},
}: ScreenProps<ParamsType>) => {
	const styles = useStyles({ interactiveItemPosition: scene.itemPosition });

	return (
		<ScreenBase>
			<Clouds />
			<Scene lottieFileSrc={scene.source} />
			<InteractiveItem
				animationObject={animationObject}
				onClickAnimationObject={onClickAnimationObject}
				style={styles.interactiveItem}
			/>
		</ScreenBase>
	);
};

export default ItemScreen;

const useStyles = createStyle({
	interactiveItem: {
		top: ({ interactiveItemPosition: { top } }) => getScaledHeight(top),
		left: ({ interactiveItemPosition: { left } }) => getScaledWidth(left),
	},
});

type ParamsType = {
	scene: {
		source: LottieSourceType;
		itemPosition: {
			top: number;
			left: number;
		};
	};
	animationObject: AnimationObjectType;
	onClickAnimationObject: AnimationObjectType;
};
