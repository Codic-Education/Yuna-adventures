import React from 'react';
import Clouds from '../components/Clouds';
import InteractiveItem, {
	PropsType as InteractiveItemPropsType,
} from '../components/InteractiveItem';
import NavigationHeader from '../components/NavigationHeader';
import Scene from '../components/Scene';
import ScreenBase from '../components/ScreenBase';
import { LottieSourceType, ScreenProps } from '../constants/globalTypes';

const QuizScreen = ({
	route: {
		params: { scene, items },
	},
}: ScreenProps<ParamsType>) => {
	return (
		<ScreenBase>
			<NavigationHeader />
			<Clouds />
			<Scene lottieFileSrc={scene.source} />
			<>
				{items.map((item, i) => (
					<InteractiveItem key={i} {...item} />
				))}
			</>
		</ScreenBase>
	);
};

export default QuizScreen;

type ParamsType = {
	scene: {
		source: LottieSourceType;
	};
	items: [InteractiveItemPropsType];
};
