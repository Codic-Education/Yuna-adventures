import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { createStyle } from '../../providers/Theme';
import Button from '../inputs/Button';

const ParentalDialog = ({ setIsAuthorizedToBuy }) => {
	const [random1, setRandom1] = useState<Number | any>();
	const [random2, setRandom2] = useState<Number | any>();
	const [rightAnswer, setRightAnswer] = useState<Number | any>();
	const [randomAnswer1, setRandomAnswer1] = useState<Number | any>();
	const [randomAnswer2, setRandomAnswer2] = useState<Number | any>();
	const [answers, setAnswers] = useState<Number[]>([]);
	const [value, setValue] = useState<boolean>(false);

	const styles = useStyles();

	useEffect(() => {
		setQuestion();
	}, []);
	const checkAnswer = (number: Number) => {
		console.log('number: ', number);
		number === rightAnswer ? setValue(true) : setValue(false);
	};

	const setQuestion = () => {
		setRandom1(Math.round(Math.random() * 21 + 1));
		setRandom2(Math.round(Math.random() * 41 + 1));
	};

	useEffect(() => {
		console.log('random 1: ', random1, 'random 2:  ', random2);
		setRightAnswer(random1 + random2);
	}, [random1]);

	useEffect(() => {
		console.log('Right Answer: ', rightAnswer);

		setRandomAnswer1(rightAnswer + rightAnswer);
		setRandomAnswer2(rightAnswer + 100);
	}, [rightAnswer]);

	useEffect(() => {
		setAnswers([randomAnswer1, randomAnswer2, rightAnswer]);
	}, [randomAnswer2]);

	useEffect(() => {
		setIsAuthorizedToBuy(value);
	}, [value]);

	const shuffleArray = (array: Number[]) => {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * i);
			const temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
	};

	const MathTest = () => {
		shuffleArray(answers);
		return answers.map((element, i) => (
			<View key={i}>
				<Button
					style={styles.ButtonStyle}
					onPressIn={() => {
						checkAnswer(element);
					}}
				>
					<Text style={styles.ButtonText}>{element}</Text>
				</Button>
			</View>
		));
	};

	return (
		<View style={styles.DialogBase}>
			<View style={styles.ContainerStyle}>
				<Text style={styles.TextStyle}>
					{random1} + {random2}
				</Text>
				<View style={styles.MathComponentStyle}>
					<MathTest />
				</View>

				<View>{value && <Text>Grattis</Text>}</View>
			</View>
		</View>
	);
};

export default ParentalDialog;

const useStyles = createStyle(({ palette: { color0, type } }) => ({
	DialogBase: {
		width: '100%',
		height: '100%',
		backgroundColor: `${color0[type].toString()}aa`,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		zIndex: 150000,
	},
	ContainerStyle: {
		width: '60%',
		height: '70%',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'white',
		padding: 20,
		borderRadius: 10,
		borderWidth: 10,
		borderColor: '#4E184B',
	},
	TextStyle: {
		marginVertical: 40,
		borderWidth: 3,
		borderColor: '#eee',
		paddingVertical: 10,
		paddingHorizontal: 30,
		borderRadius: 5,
		fontSize: 25,
		fontFamily: 'coiny',
	},
	ButtonStyle: {
		padding: 15,
		marginHorizontal: 20,
		backgroundColor: '#4E184B',
		borderRadius: 5,
	},
	ButtonText: { color: 'white', fontFamily: 'coiny' },
	MathComponentStyle: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignContent: 'space-between',
	},
}));
