import React from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';
import star from './default.json';
import { createStyle } from '../../providers/Theme';
import { getScaledHeight, getScaledWidth } from '../../utilities';

const dimensions = { width: 407, height: 156 };

const StarsProgressIndicator = ({ progressValue }: PropTypes) => {
	const styles = useStyles();

	return (
		<View style={styles.StarsProgressIndicator}>
			<View style={styles.bottomStarsContainer}>
				<LottieView
					source={star}
					style={styles.star}
					resizeMode="contain"
					autoPlay={progressValue >= 1}
					loop={false}
				/>
				<LottieView
					source={star}
					style={styles.star}
					resizeMode="contain"
					autoPlay={progressValue >= 2}
					loop={false}
				/>
			</View>
			<LottieView
				source={star}
				style={[styles.star, styles.middleStar]}
				resizeMode="contain"
				autoPlay={progressValue >= 3}
				loop={false}
			/>
		</View>
	);
};

export default StarsProgressIndicator;

const useStyles = createStyle(() => ({
	StarsProgressIndicator: {
		top: 5,
		width: getScaledWidth(dimensions.width),
		height: getScaledHeight(dimensions.height),
		flexDirection: 'row',
		alignSelf: 'center',
		justifyContent: 'center',
		position: 'relative',
	},
	star: {
		width: getScaledWidth(star.w),
		aspectRatio: star.w / star.h,
	},
	middleStar: { top: 0, position: 'absolute' },
	bottomStarsContainer: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignSelf: 'flex-end',
	},
}));

export type ProgressValueType = 0 | 1 | 2 | 3;

interface PropTypes {
	progressValue: ProgressValueType;
}
