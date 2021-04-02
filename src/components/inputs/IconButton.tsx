import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { createStyle } from '../../providers/Theme';
import FlagIcon from 'react-native-ico-flags';
import { LottieSourceType, StylePropertyType } from '../../constants/globalTypes';
import LottieView from 'lottie-react-native';
import { getScaledWidth } from '../../utilities';

const iconWidth = 30;

const IconButton = ({
	flag,
	touchableOpacityStyle,
	inactive,
	redStroke,
	style,
	lottieFileSrc,
	lottieViewStyle,
	...props
}: IconButtonPropsType) => {
	const styles = useStyles();

	return (
		<View style={[style, inactive && styles.inactive]}>
			<TouchableOpacity
				style={[styles.Button, touchableOpacityStyle]}
				activeOpacity={0.8}
				{...props}
			>
				{flag && <FlagIcon name={flag} width={iconWidth} height={iconWidth} />}
				{lottieFileSrc && (
					<LottieView
						source={lottieFileSrc}
						autoPlay
						style={[styles.lottieView, lottieViewStyle]}
						resizeMode="contain"
					/>
				)}
				{redStroke && <View style={styles.redStroke} />}
			</TouchableOpacity>
		</View>
	);
};

export default IconButton;

const useStyles = createStyle(({ palette: { color3, color5, color8, type } }) => ({
	Button: {
		maxWidth: 80,
		maxHeight: 80,
		backgroundColor: color3[type],
		padding: 18,
		borderRadius: 60,
		borderStyle: 'solid',
		borderWidth: getScaledWidth(10),
		borderColor: color8[type],
		overflow: 'hidden',
		alignItems: 'center',
		justifyContent: 'center',
		position: 'relative',
		elevation: 4,
		shadowOffset: { width: 4, height: 4 },
		shadowOpacity: 0.5,
		alignSelf: 'flex-start',
	},
	inactive: {
		opacity: 0.8,
	},
	lottieView: {
		width: iconWidth,
	},
	redStroke: {
		backgroundColor: color5[type],
		width: 50,
		height: 5,
		transform: [{ rotate: '-45deg' }],
		position: 'absolute',
		borderRadius: 100,
	},
}));

export type IconButtonPropsType =
	| (PropsBaseType & {
			flag: string;
			lottieFileSrc?: undefined;
	  })
	| (PropsBaseType & {
			flag?: undefined;
			lottieFileSrc: LottieSourceType;
	  });

interface PropsBaseType extends TouchableOpacityProps {
	inactive?: boolean;
	redStroke?: boolean;
	touchableOpacityStyle?: StylePropertyType;
	style?: StylePropertyType;
	lottieViewStyle?: StylePropertyType;
}
