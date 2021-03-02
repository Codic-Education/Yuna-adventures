import React from 'react';
import { View } from 'react-native';
import { ChildrenType } from '../constants/globalTypes';
import { createStyle } from '../providers/Theme';

const ScreenBase = ({ children }: ChildrenType) => {
	const styles = useStyle();

	return <View style={styles.ViewBackground}>{children}</View>;
};

export default ScreenBase;

const useStyle = createStyle(({ palette: { color2, type } }) => ({
	ViewBackground: {
		backgroundColor: color2[type],
		width: '100%',
		height: '100%',
		flex: 1,
	},
}));
