import React from 'react';
import { GestureResponderEvent, TouchableOpacity } from 'react-native';
import { createStyle } from '../../providers/Theme';
import { Entypo } from '@expo/vector-icons';

const IconButton = ({ iconName, onPress }: PropsType) => {
	const styles = useStyles();

	return (
		<TouchableOpacity style={styles.btn} onPress={onPress}>
			<Entypo name={iconName} size={24} color="white" />
		</TouchableOpacity>
	);
};

export default IconButton;

const useStyles = createStyle(({ palette: { color3, type } }) => ({
	btn: {
		backgroundColor: color3[type],
		padding: 18,
		borderRadius: 60,
		borderStyle: 'solid',
		borderWidth: 7,
		borderColor: '#eee',
	},
}));

interface PropsType {
	iconName: string;
	onPress: (event: GestureResponderEvent) => void;
}
