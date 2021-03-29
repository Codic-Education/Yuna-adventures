import React from 'react';
import { GestureResponderEvent, TouchableOpacityProps, View } from 'react-native';
import LottieView from 'lottie-react-native';
import Button from './inputs/Button';
import { createStyle } from '../providers/Theme';
import TranslatedText from './TranslatedText';
import { CategoryType } from '../constants/globalTypes';
import Clouds from './Clouds';
import { getScaledWidth } from '../utilities';

const Category = ({ style, titleId, thumbnailSrc, onPress, ...props }: Props) => {
	const styles = useStyles({ buttonWidth: thumbnailSrc.w, buttonHeight: thumbnailSrc.h });

	return (
		<Button style={[styles.Category, style]} onPress={onPress} {...props}>
			<TranslatedText id={titleId} style={styles.title} />
			<View style={styles.thumbnail}>
				<Clouds style={{ top: 10 }} />
				<LottieView resizeMode="cover" source={thumbnailSrc} autoPlay loop />
			</View>
		</Button>
	);
};

export default Category;

const useStyles = createStyle(
	({
		palette: { color0, color2, color3, color6, color8, type },
		dimensions: { screenWidth },
	}) => ({
		Category: {
			height: '100%',
			flex: 1,
			alignItems: 'center',
			justifyContent: 'center',
			flexDirection: 'column',
			backgroundColor: color6[type],
		},
		title: {
			color: color3[type],
			fontWeight: 'bold',
			fontSize: 20,
			marginTop: 20,
			marginBottom: 20,
		},
		thumbnail: {
			width: ({ buttonWidth }) => getScaledWidth(buttonWidth),
			backgroundColor: color2[type],
			borderWidth: getScaledWidth(16),
			borderColor: color8[type],
			borderRadius: screenWidth,
			overflow: 'hidden',
			position: 'relative',
			aspectRatio: ({ buttonWidth, buttonHeight }) => buttonWidth / buttonHeight,
			shadowOffset: { height: 5, width: 5 },
			shadowColor: color0[type],
			shadowOpacity: 0.3,
			elevation: 5,
		},
	})
);

interface Props extends CategoryType, TouchableOpacityProps {
	style?: {};
	onPress: (event: GestureResponderEvent) => void;
}
