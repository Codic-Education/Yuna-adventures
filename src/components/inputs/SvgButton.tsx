import React, { ReactElement } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { ChildrenType } from '../../constants/globalTypes';
import { createStyle } from '../../providers/Theme';
import { Entypo } from '@expo/vector-icons';

interface Props extends ChildrenType {
	iconName: string;
	onPress: any;
}

const SvgButton = ({ iconName, onPress }: Props) => {
	const styles = useStyles();

	return (
		<TouchableOpacity style={styles.btn} onPress={onPress}>
			<Entypo name={iconName} size={24} color="white" />
		</TouchableOpacity>
	);
};

export default SvgButton;

const useStyles = createStyle(({ palette: { color3, type } }) => ({
	btn: {
		backgroundColor: color3[type],
		padding: 18,
		borderRadius: '100%',
		borderStyle: 'solid',
		borderWidth: 7,
		borderColor: '#eee',
	},
}));
