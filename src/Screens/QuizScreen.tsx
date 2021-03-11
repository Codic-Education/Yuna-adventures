import React from 'react';
import { StyleSheet, View } from 'react-native';
import Clouds from '../components/Clouds';
import InteractiveItem, {
	PropsType as InteractiveItemPropsType,
} from '../components/InteractiveItem';
import NavigationHeader from '../components/NavigationHeader';
import Scene from '../components/Scene';
import ScreenBase from '../components/ScreenBase';
import { LottieSourceType, ScreenProps } from '../constants/globalTypes';
import { createStyle } from '../providers/Theme';

const QuizScreen = ({
	route: {
		params: { scene, items },
	},
}: ScreenProps<ParamsType>) => {
	const styles = useStyles();
	return (
		<ScreenBase>
			<NavigationHeader />
			<Clouds />
			<Scene lottieFileSrc={scene.source} />
			<View style={styles.itemsContainer}>
				{items.map((item, i) => (
					<View key={i} style={styles.itemWrapper}>
						<InteractiveItem
							{...item}
							position={{ bottom: i === 1 ? 102 : 309 }}
							autoPlay
							onClickAnimationObject={undefined}
						/>
					</View>
				))}
			</View>
		</ScreenBase>
	);
};

export default QuizScreen;

const useStyles = createStyle({
	itemsContainer: {
		flex: 1,
		flexDirection: 'row',
	},
	itemWrapper: {
		flex: 1,
		alignItems: 'center',
	},
});

type ParamsType = {
	scene: {
		source: LottieSourceType;
	};
	items: [InteractiveItemPropsType];
};
