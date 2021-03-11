import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { createStyle } from '../../providers/Theme';
import * as iconPackages from '@expo/vector-icons';
import FlagIcon from 'react-native-ico-flags';
import { LottieSourceType, StylePropertyType } from '../../constants/globalTypes';
import LottieView from 'lottie-react-native';

const iconWidth = 30;

const IconButton = ({
	iconName,
	packageName,
	flag,
	touchableOpacityStyle,
	inactive,
	redStroke,
	style,
	lottieFileSrc,
	lottieViewStyle,
	...props
}: PropsType) => {
	const styles = useStyles();
	const IconComponent = packageName ? iconPackages[packageName] : undefined;

	return (
		<View style={[style, inactive && styles.inactive]}>
			<TouchableOpacity
				style={[styles.btn, touchableOpacityStyle]}
				activeOpacity={0.8}
				{...props}
			>
				{packageName && iconName && (
					<IconComponent
						name={iconName}
						size={iconWidth}
						color={touchableOpacityStyle?.color || 'white'}
					/>
				)}
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

const useStyles = createStyle(({ palette: { color1, color3, color5, type } }) => ({
	btn: {
		maxWidth: 80,
		maxHeight: 80,
		backgroundColor: color3[type],
		padding: 18,
		borderRadius: 60,
		borderStyle: 'solid',
		borderWidth: 7,
		borderColor: color1[type],
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

type PropsType =
	| (PropsBaseType & {
			packageName:
				| 'AntDesign'
				| 'Entypo'
				| 'EvilIcons'
				| 'Feather'
				| 'FontAwesome'
				| 'FontAwesome5'
				| 'Fontisto'
				| 'Foundation'
				| 'Ionicons'
				| 'MaterialCommunityIcons'
				| 'MaterialIcons'
				| 'Octicons'
				| 'SimpleLineIcons'
				| 'Zocial';
			iconName: string;
			flag?: undefined;
			lottieFileSrc?: undefined;
	  })
	| (PropsBaseType & {
			packageName?: undefined;
			iconName?: undefined;
			flag: string;
			lottieFileSrc?: undefined;
	  })
	| (PropsBaseType & {
			packageName?: undefined;
			iconName?: undefined;
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
