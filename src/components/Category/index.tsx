import React from 'react';
import { GestureResponderEvent, View } from 'react-native';
import LottieView from 'lottie-react-native';
import Button from '../inputs/Button';
import animals from './animals.json';
import vehicles from './vehicles.json';
import { createStyle } from '../../providers/Theme';
import TranslatedText from '../TranslatedText';

const Category = ({ style, variant, onPress }: Props) => {
	const styles = useStyles();
	const data = getCategoryData(variant);

	return (
		<View style={[styles.Category, style]}>
			<TranslatedText id={data.textId} style={styles.title} />
			<Button style={styles.button} onPress={onPress}>
				<LottieView resizeMode="cover" source={data.source} />
			</Button>
		</View>
	);
};

export default Category;

const getCategoryData = (variant: VariantType) => {
	switch (variant) {
		case 'animals':
			return { textId: 'Category.animals.title', source: animals };
		case 'vehicles':
			return { textId: 'Category.vehicles.title', source: vehicles };
	}
};

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

interface Props {
	variant: VariantType;
	style?: {};
	onPress: (event: GestureResponderEvent) => void;
}

type VariantType = 'animals' | 'vehicles';
