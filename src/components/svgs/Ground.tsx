import React from 'react';
import Svg, { Rect } from 'react-native-svg';
import { createStyle } from '../../providers/Theme';
import { getSvgHeightByCustomWidth, getViewBox } from '../../utilities/svg';

interface PropsType {
	variant: 'farm' | 'desert';
}

const Ground = ({ variant }: PropsType) => {
	const viewBox = {
		width: 667,
		height: 143,
	};
	const styles = useStyle({ groundColor: getGroundColor(variant), viewBox });

	return (
		<Svg viewBox={getViewBox(viewBox)} style={styles.Ground}>
			<Rect {...styles.rect} />
		</Svg>
	);
};

export default Ground;

const useStyle = createStyle(({ dimensions: { screenWidth } }) => ({
	Ground: {
		width: screenWidth,
		height: ({ viewBox }) => getSvgHeightByCustomWidth(viewBox, screenWidth),
		position: 'absolute',
		bottom: 0,
		left: 0,
	},
	rect: {
		fill: ({ groundColor }) => groundColor,
		width: '100%',
		height: '100%',
	},
}));

const getGroundColor = (variant) => {
	switch (variant) {
		case 'farm':
			return '#99CC66';
		case 'desert':
			return '#FECC66';
		default:
			return '#99CC66';
	}
};
