import React from 'react';
import { GestureResponderEvent, View } from 'react-native';
import LottieView from 'lottie-react-native';
import Button from './inputs/Button';
import { createStyle } from '../providers/Theme';
import TranslatedText from './TranslatedText';
import { CategoryType } from '../constants/globalTypes';

const Category = ({ style, titleId, thumbnailSrc, onPress }: Props) => {
	const styles = useStyles();

	return (
		<View style={[styles.Category, style]}>
			<TranslatedText id={titleId} style={styles.title} />
			<Button style={styles.button} onPress={onPress}>
				<LottieView resizeMode="cover" source={thumbnailSrc} />
			</Button>
		</View>
	);
};

export default Category;

const useStyles = createStyle(({ palette: { color3, type }, dimensions: { screenWidth } }) => ({
	Category: {
		height: '100%',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column',
	},
	title: {
		color: color3[type],
		fontWeight: 'bold',
		fontSize: 20,
		marginTop: 20,
		marginBottom: 20,
	},
	button: {
		width: screenWidth * 0.4,
		height: screenWidth * 0.4,
		borderWidth: 8,
		borderColor: '#fff',
		borderRadius: screenWidth,
		overflow: 'hidden',
	},
}));

interface Props extends CategoryType {
	style?: {};
	onPress: (event: GestureResponderEvent) => void;
}
