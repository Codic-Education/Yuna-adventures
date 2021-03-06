import React from 'react';
import { GestureResponderEvent, View } from 'react-native';
import LottieView from 'lottie-react-native';
import Button from './inputs/Button';
import { createStyle } from '../providers/Theme';
import TranslatedText from './TranslatedText';
import { CategoryType } from '../constants/globalTypes';
import Clouds from './Clouds';
import { getScaledWidth } from '../utilities';

const Category = ({ style, titleId, thumbnailSrc, onPress }: Props) => {
	const styles = useStyles({ buttonWidth: thumbnailSrc.w, buttonHeight: thumbnailSrc.h });

	return (
		<View style={[styles.Category, style]}>
			<TranslatedText id={titleId} style={styles.title} />
			<Button style={styles.button} onPress={onPress}>
				<Clouds style={{ top: 10 }} />
				<LottieView resizeMode="cover" source={thumbnailSrc} autoPlay loop />
			</Button>
		</View>
	);
};

export default Category;

const useStyles = createStyle(
	({ palette: { color2, color3, color6, type }, dimensions: { screenWidth } }) => ({
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
		button: {
			width: ({ buttonWidth }) => getScaledWidth(buttonWidth),
			backgroundColor: color2[type],
			borderWidth: 8,
			borderColor: '#fff',
			borderRadius: screenWidth,
			overflow: 'hidden',
			position: 'relative',
			aspectRatio: ({ buttonWidth, buttonHeight }) => buttonWidth / buttonHeight,
		},
	})
);

interface Props extends CategoryType {
	style?: {};
	onPress: (event: GestureResponderEvent) => void;
}
