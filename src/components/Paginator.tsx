import React from 'react';
import { createStyle } from '../providers/Theme';
import IconButton from './inputs/IconButton';

const Paginator = ({ state, lastIndex }: PaginatorPropsType) => {
	const styles = useStyles();
	const [index, setIndex] = state;

	const previousScreen = () => {
		index > 0 && setIndex(index - 1);
	};

	const nextScreen = () => {
		index < lastIndex && setIndex(index + 1);
	};

	return (
		<>
			{index > 0 && (
				<IconButton
					lottieFileSrc={require('../assets/icons/arrow-left.json')}
					onPress={previousScreen}
					style={styles.previousButton}
					inactive={index === 0}
				/>
			)}
			{index < lastIndex && (
				<IconButton
					lottieFileSrc={require('../assets/icons/arrow-right.json')}
					onPress={nextScreen}
					style={styles.nextButton}
					inactive={index === lastIndex}
				/>
			)}
		</>
	);
};

export default Paginator;

const useStyles = createStyle(({ dimensions: { screenHeight } }) => ({
	previousButton: {
		top: screenHeight / 2,
		position: 'absolute',
		left: 40,
		transform: [{ translateY: -41 }],
	},
	nextButton: {
		top: screenHeight / 2,
		right: 40,
		position: 'absolute',
		transform: [{ translateY: -41 }],
	},
}));

interface PaginatorPropsType {
	state: [number, (index: number) => void];
	lastIndex: number;
}
