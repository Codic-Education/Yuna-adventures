import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text,  SafeAreaView , Dimensions } from 'react-native';
import Button from '../../components/inputs/Button';
import { createStyle } from '../../providers/Theme';

const { width, height } = Dimensions.get('screen');

const AnimalScreen = () => {
	const navigation = useNavigation();
	const styles = useStyles();

	return (
		<SafeAreaView  style={styles.animalScreen}>
			<Button
				onPress={() => navigation.navigate('AnimalSelectorScreen')}
				style={styles.button}
			>
				Press to go to Animals
			</Button>
			<Text style={styles.text}>AnimalScreen, WILD OR TAME ANIMALS</Text>
			{/* <Button
				style={styles.button}
				onPress={() => {
					navigation.navigate('AnimalSelectorScreen');
				}}
			>
				<Text>Push to go forward </Text>
			</Button> */}

			<Button onPress={() => navigation.navigate('Home')} style={styles.button}>
				Home
			</Button>
		</SafeAreaView >
	);
};

export default AnimalScreen;

const useStyles = createStyle({
	button: {
		// flex:1,
		borderColor: '#000',
		borderWidth: 2,
		width: width / 5,
		height: 50,
		justifyContent:"center",
		alignItems:"center",
		textAlign:"center"
	},
	animalScreen: {
		// flex:1,
		flexDirection: 'row-reverse',
		justifyContent: 'space-between',
		marginHorizontal: 10,
		marginVertical: 5,
		height:100
	
	},
	text: {height:50, fontSize: 18, textAlignVertical: 'center', alignSelf: 'center' },
});
