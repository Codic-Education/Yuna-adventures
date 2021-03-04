import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { createStyle } from '../../providers/Theme';
import * as iconPackages from '@expo/vector-icons';
import FlagIcon from 'react-native-ico-flags';

const IconButton = ({ iconName, packageName, flag, ...props }: PropsType) => {
	const styles = useStyles();
	const IconComponent = packageName ? iconPackages[packageName] : undefined;

	return (
		<TouchableOpacity activeOpacity={0.8} {...props} style={[styles.btn, props.style]}>
			{packageName && iconName && (
				<IconComponent name={iconName} size={24} color={props.style?.color || 'white'} />
			)}
			{flag && <FlagIcon name={flag} width={24} height={24} />}
		</TouchableOpacity>
	);
};

export default IconButton;

const useStyles = createStyle(({ palette: { color1, color3, type } }) => ({
	btn: {
		backgroundColor: color3[type],
		padding: 18,
		borderRadius: 60,
		borderStyle: 'solid',
		borderWidth: 7,
		borderColor: color1[type],
	},
}));

type PropsType =
	| (TouchableOpacityProps & {
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
	  })
	| (TouchableOpacityProps & {
			packageName?: undefined;
			iconName?: undefined;
			flag?: string;
	  });
