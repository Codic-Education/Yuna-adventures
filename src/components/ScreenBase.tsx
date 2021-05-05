import React from 'react';
import { View } from 'react-native';
import { ChildrenType, StylePropertyType } from '../constants/globalTypes';
import { createStyle } from '../providers/Theme';

const ScreenBase = ({ children, style }: ScreenBasePropsType) => {
	const styles = useStyles();

	return <View style={[styles.ViewBackground, style]}>{children}</View>;
};

export default ScreenBase;

const useStyles = createStyle(({ palette: { color2, type } }) => ({
	ViewBackground: {
		backgroundColor: color2[type],
		width: '100%',
		height: '100%',
		flex: 1,
	},
}));

interface ScreenBasePropsType extends ChildrenType {
	style?: StylePropertyType;
}
