import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { createStyle } from '../../providers/Theme';
import { getSvgHeightByCustomWidth, getViewBox } from '../../utilities/svg';

interface PropsType {
	width: number;
	opacity?: number;
}

const Cloud = ({ width, opacity = 1 }: PropsType) => {
	const viewBox = {
		width: 158,
		height: 96,
	};
	const styles = useStyle({ width, height: getSvgHeightByCustomWidth(viewBox, width), opacity });

	return (
		<Svg viewBox={getViewBox(viewBox)} style={styles.Cloud}>
			<Path
				d="M14.827 89.4C5.875 83.265.002 72.965.002 61.292c0-18.806 15.245-34.051 34.051-34.051 4.575 0 8.938.902 12.923 2.538C50.243 12.814 65.169 0 83.086 0c15.078 0 28.035 9.073 33.712 22.056a37.162 37.162 0 014.426-.263c20.311 0 36.775 16.465 36.775 36.775s-16.464 36.776-36.775 36.776c-.998 0-1.986-.04-2.964-.118-.817.078-1.646.118-2.484.118H31.329A25.773 25.773 0 0114.827 89.4z"
				{...styles.path}
			/>
		</Svg>
	);
};

export default Cloud;

const useStyle = createStyle({
	Cloud: {
		width: ({ width }) => width,
		height: ({ height }) => height,
		opacity: ({ opacity }) => opacity,
	},
	path: {
		fill: '#ffffff',
	},
});
