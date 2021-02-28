import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert, View } from 'react-native';
import ViewBackground from '../components/ViewBackground';
import { createStyle } from '../providers/Theme';
import Category from '../components/Category';
import NavigationHeader from '../components/NavigationHeader';

const HomeScreen = () => {
	const navigation = useNavigation();
	const styles = useStyles();

	return (
		<ViewBackground>
			<NavigationHeader />
			<View style={styles.container}>
				<Category
					variant="animals"
					onPress={() => navigation.navigate('AnimalNavigator')}
				/>
				<Category
					variant="vehicles"
					style={styles.rightSideCategory}
					onPress={() => Alert.alert('Get driving license first')}
				/>
			</View>
		</ViewBackground>
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
