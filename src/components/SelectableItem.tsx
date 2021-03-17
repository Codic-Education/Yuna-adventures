import React from 'react';
import { GestureResponderEvent } from 'react-native';
import LottieView from 'lottie-react-native';
import Button from './inputs/Button';
import { createStyle } from '../providers/Theme';
import { LottieSourceType, StylePropertyType } from '../constants/globalTypes';
import { getScaledHeight, getScaledWidth } from '../utilities';

export const SelectableItemWidth: number = 425.84;

const SelectableItem = ({ thumbnailSrc, onPress, lottieViewStyle }: SelectableItemPropsType) => {
	const styles = useStyles({
		thumbnailWidth: getScaledWidth(thumbnailSrc?.w),
	});

	return (
		<Button style={styles.SelectableItems} onPress={onPress}>
			<LottieView
				style={[styles.lottieView, lottieViewStyle]}
				autoPlay
				source={thumbnailSrc}
				resizeMode="contain"
			/>
		</Button>
	);
};

export default SelectableItem;

const useStyles = createStyle(({ palette: { color1, color3, type } }) => ({
	SelectableItems: {
		width: getScaledWidth(SelectableItemWidth),
		height: getScaledHeight(SelectableItemWidth),
		maxHeight: getScaledWidth(SelectableItemWidth),
		borderWidth: 10,
		borderColor: color1[type],
		backgroundColor: color3[type],
		borderRadius: 15,
		shadowOffset: { height: 5, width: 5 },
		shadowColor: color3[type],
		shadowOpacity: 0.3,
		elevation: 5,
		margin: 6,
	},
	lottieView: {
		width: ({ thumbnailWidth }) => thumbnailWidth * 0.7,
		marginLeft: 0,
		position: 'absolute',
		bottom: 0,
		right: '-5%',
	},
}));

interface SelectableItemPropsType {
	style?: StylePropertyType;
	thumbnailSrc: LottieSourceType;
	onPress: (event: GestureResponderEvent) => void;
	lottieViewStyle?: StylePropertyType;
}
