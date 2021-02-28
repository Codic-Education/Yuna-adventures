import React from 'react';
import { SafeAreaView } from 'react-native';
import { ChildrenType } from '../constants/globalTypes';
import { createStyle } from '../providers/Theme';

const ViewBackground = ({ children }: ChildrenType) => {
	const styles = useStyle();

	return <SafeAreaView style={styles.ViewBackground}>{children}</SafeAreaView>;
};

export default ViewBackground;

const useStyle = createStyle(({ palette: { color2, type },dimensions: {screenHeight,screenWidth} } ) => ({
	ViewBackground: {
		backgroundColor: color2[type],
		width: "100%",
		height:"100%",
		// flex:1
	},
}));
