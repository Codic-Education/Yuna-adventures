import React, { useEffect, useRef } from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';
import star from '../assets/animations/star.json';
import { createStyle } from '../providers/Theme';
import { getScaledHeight, getScaledWidth } from '../utilities';
import { QuizProgressValueType } from '../constants/globalTypes';

const dimensions = { width: 407, height: 156 };

const StarsProgressIndicator = ({ progressValue }: PropTypes) => {
	const styles = useStyles();
	const refs = [useRef(), useRef(), useRef()];

	useEffect(() => {
		progressValue > 0 && progressValue <= 3 && refs[progressValue - 1].current.play();
	}, [progressValue]);

	return (
		<View style={styles.StarsProgressIndicator}>
			<View style={styles.bottomStarsContainer}>
				<LottieView
					ref={refs[0]}
					source={star}
					style={styles.star}
					resizeMode="contain"
					loop={false}
				/>
				<LottieView
					ref={refs[1]}
					source={star}
					style={styles.star}
					resizeMode="contain"
					loop={false}
				/>
			</View>
			<LottieView
				ref={refs[2]}
				source={star}
				style={[styles.star, styles.middleStar]}
				resizeMode="contain"
				loop={false}
			/>
		</View>
	);
};

export default StarsProgressIndicator;

const useStyles = createStyle(() => ({
	StarsProgressIndicator: {
		top: getScaledHeight(23),
		width: getScaledWidth(dimensions.width),
		height: getScaledHeight(dimensions.height),
		flexDirection: 'row',
		alignSelf: 'center',
		justifyContent: 'center',
		position: 'absolute',
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

interface PropTypes {
	progressValue: QuizProgressValueType;
}
