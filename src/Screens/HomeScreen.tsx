import React from 'react';
import { View } from 'react-native';
import ScreenBase from '../components/ScreenBase';
import { createStyle } from '../providers/Theme';
import Category from '../components/Category';
import NavigationHeader from '../components/NavigationHeader';
//TODO: create & use data provide instead.
import categories from '../data/categories';
import { ScreenProps } from '../constants/globalTypes';

const HomeScreen = ({ navigation }: ScreenProps) => {
	const styles = useStyles();

	return (
		<ScreenBase>
			<NavigationHeader />
			<View style={styles.container}>
				{Object.entries(categories).map(([name, props], i) => (
					<Category
						key={name}
						{...props}
						onPress={() =>
							navigation.navigate('ItemNavigator', {
								screen: 'ItemSelectorScreen',
								params: { category: name },
							})
						}
						style={i % 2 === 1 ? styles.rightSideCategory : {}}
					/>
				))}
			</View>
		</ScreenBase>
	);
};

export default HomeScreen;

const useStyles = createStyle(
	({ palette: { color4, type }, dimensions: { screenHeight, screenWidth } }) => ({
		headerBar: {
			flexDirection: 'row-reverse',
			justifyContent: 'space-between',
			marginHorizontal: 10,
			marginVertical: 5,
			position: 'absolute',
			width: '100%',
			zIndex: 100,
			marginTop: 30,
		},
		headerButton: {
			borderColor: '#000',
			borderWidth: 2,
			width: screenWidth / 5,
			height: 'auto',
		},
		container: {
			flex: 1,
			width: screenWidth,
			height: screenHeight,
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-around',
		},
		rightSideCategory: { backgroundColor: color4[type] },
	})
);
