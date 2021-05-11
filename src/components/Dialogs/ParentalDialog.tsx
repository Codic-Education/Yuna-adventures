import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { createStyle } from '../../providers/Theme';
import { getScaledWidth } from '../../utilities';
import Button from '../inputs/Button';

const ParentalDialog = ({ onAnswerCorrectly }: ParentalDialogPropsType) => {
	const [randomNumber1, setRandomNumber1] = useState(0);
	const [randomNumber2, setRandomNumber2] = useState(0);
	const [rightAnswer, setRightAnswer] = useState(0);
	const [answers, setAnswers] = useState<Number[]>([]);
	const styles = useStyles();

	useEffect(() => {
		setQuestion();
	}, []);

	const setQuestion = () => {
		const random1 = getRandomNumber();
		const random2 = getRandomNumber();
		const correctAnswer = random1 + random2;
		setRightAnswer(correctAnswer);
		setRandomNumber1(random1);
		setRandomNumber2(random2);
		const option1 = random1 + random2 + getRandomNumber();
		const option2 = getRandomNumber();
		const option3 = getRandomNumber();
		const option4 = getRandomNumber();
		const option5 = getRandomNumber();
		const option6 = getRandomNumber();

		setAnswers(shuffleArray([option1, option2, correctAnswer, option3, option4, option5]));
	};

	const checkAnswer = (number: Number) => {
		if (number === rightAnswer) {
			onAnswerCorrectly();
		} else {
			setQuestion();
		}
	};

	const getRandomNumber = () => {
		return Math.round(Math.random() * 100 + 1);
	};

	const shuffleArray = (array: Number[]) => {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * i);
			const temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
		return array;
	};

	return (
		<View style={styles.ParentalDialog}>
			<Text style={styles.TextStyle}>
				{randomNumber1} + {randomNumber2}
			</Text>
			<View style={styles.MathComponentStyle}>
				{Boolean(rightAnswer) &&
					answers.map((element, i) => (
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
					))}
			</View>
		</View>
	);
};

export default ParentalDialog;

const useStyles = createStyle(({ palette: { color3, color8, type } }) => ({
	ParentalDialog: {
		marginTop: -15,
		flex: 1,
		justifyContent: 'space-between',
		maxHeight: 150,
	},
	TextStyle: {
		backgroundColor: color3[type],
		borderWidth: 3,
		borderColor: color8[type],
		paddingVertical: 5,
		paddingHorizontal: 30,
		borderRadius: getScaledWidth(15),
		fontSize: getScaledWidth(65),
		fontFamily: 'coiny',
		color: color8[type],
		textAlign: 'center',
		alignSelf: 'center',
	},
	MathComponentStyle: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
		alignContent: 'space-between',
		//maxWidth: getScaledWidth(900),
		alignSelf: 'center',
		display: 'flex',
	},
	ButtonStyle: {
		paddingHorizontal: 15,
		paddingVertical: 5,
		marginHorizontal: 20,
		minWidth: 75,
		backgroundColor: color8[type],
		borderRadius: getScaledWidth(15),
		marginBottom: 5,
		flex: 1,
		flexBasis: (100 % 10) + '%',
		//display: 'flex',
	},
	ButtonText: {
		color: color3[type],
		fontFamily: 'coiny',
		fontSize: getScaledWidth(50),
		textAlign: 'center',
	},
}));

type ParentalDialogPropsType = {
	onAnswerCorrectly: () => void;
};
