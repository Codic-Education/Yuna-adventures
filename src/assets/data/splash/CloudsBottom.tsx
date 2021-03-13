import * as React from 'react';
import { Dimensions } from 'react-native';
import Svg, { SvgProps, G, Path } from 'react-native-svg';
import { getSvgHeightByCustomWidth, getViewBox } from '../../../utilities/svg';

function SvgComponent(props: SvgProps) {
	const { width, height } = Dimensions.get('screen');

	const viewBox = {
		width: width,
		height: height / 2,
	};

	return (
		<Svg viewBox={`0 0 ${1900} 306`} preserveAspectRatio="xMinYMin slice" {...props}>
			{/* <G data-name="Layer 2"> */}
			<Path
				d="M1900 113.32a140.59 140.59 0 00-129.61-21.75A150.21 150.21 0 001631.59 0c-81.47 0-147.8 64.19-150.1 144.07-2.74-.22-5.49-.33-8.23-.33-54.38 0-98.45 43.62-98.56 97.09q0 2.14.09 4.26a187.61 187.61 0 00-55.07 9.55c-30.36-72.29-102.41-123.06-186.55-123.06A202.06 202.06 0 00950 247.2a190.15 190.15 0 00-28.61-2.2 187.7 187.7 0 00-59.53 9.6c-30.35-72.29-102.41-123.06-186.55-123.06a202.35 202.35 0 00-157 74.16 98.68 98.68 0 00-91.86-62q-4.11 0-8.22.33C415.93 64.19 349.59 0 268.13 0a150.22 150.22 0 00-138.81 91.57A140.59 140.59 0 000 113.1V306h1900z"
				fill="#fff"
				fillRule="evenodd"
				data-name="Layer 1"
			/>
			{/* </G> */}
		</Svg>
	);
}

export default SvgComponent;
