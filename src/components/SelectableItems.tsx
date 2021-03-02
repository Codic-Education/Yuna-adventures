import React from 'react';
import { GestureResponderEvent, View } from 'react-native';
import LottieView from 'lottie-react-native';
import Button from './inputs/Button';
import { createStyle } from '../providers/Theme';
import { CategoryType, LottieSourceType } from '../constants/globalTypes';

const SelectableItems = ({ thumbnailSrc, onPress }: PropsType) => {
	const styles = useStyles();

	return (
		<Button style={styles.button} onPress={onPress}>
			<LottieView style={styles.LottieView} autoPlay source={thumbnailSrc} />
		</Button>
	);
};

export default SelectableItems;

const useStyles = createStyle(({ palette: { color3, type }, dimensions: { screenWidth } }) => ({
	SelectableItems: {
		alignItems: 'center',
		justifyContent: 'center',
		margin: 15,
		zIndex: -1,
	},

	button: {
		width: screenWidth * 0.2,
		height: screenWidth * 0.2,
		borderWidth: 8,
		borderColor: '#fff',
		backgroundColor: '#4E184B',
		borderRadius: 10,
		position: 'relative',
		zIndex: -1,
		alignItems: 'center',
		justifyContent: 'center',
		margin: 15,
	},
	LottieView: {
		width: screenWidth * 0.17,
		height: screenWidth * 0.17,
		marginLeft: 0,
		position: 'absolute',
		bottom: -3,
		right: -5,
		zIndex: 10,
	},
}));

interface PropsType  {
	style?: {};
	thumbnailSrc: LottieSourceType;
	onPress: (event: GestureResponderEvent) => void;
}
