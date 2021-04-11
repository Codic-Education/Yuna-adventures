import React from 'react';
import { View } from 'react-native';
import ScreenBase from '../components/ScreenBase';
import { createStyle } from '../providers/Theme';
import Category from '../components/Category';
import NavigationHeader from '../components/NavigationHeader';
import { ScreenProps } from '../constants/globalTypes';
import { useData } from '../providers/Data';

const HomeScreen = ({ navigation }: ScreenProps<object>) => {
	const styles = useStyles();
	const { categories } = useData();

	return (
		<ScreenBase>
			<NavigationHeader variant="settings" />
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

const useStyles = createStyle(({ palette: { color4, type }, dimensions: { screenWidth } }) => ({
	container: {
		flex: 1,
		width: '100%',
		height: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
	},
	rightSideCategory: { backgroundColor: color4[type] },
}));
