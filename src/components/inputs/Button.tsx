import React, { ReactElement } from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { ChildrenType } from '../../constants/globalTypes';
import { createStyle } from '../../providers/Theme';

interface Props extends TouchableOpacityProps, ChildrenType {
	style: any;
}

const Button = ({ children, style, ...props }: Props) => {
	const styles = useStyles();

	return (
		<TouchableOpacity style={{ ...styles.Button, ...style }} {...props}>
			<Text
				style={{
					color: style.color ? style.color : '#000000',
				}}
			>
				{children}
			</Text>
		</TouchableOpacity>
	);
};

export default Button;

const useStyles = createStyle({
	Button: {
		padding: 8,
		paddingRight: 16,
		paddingLeft: 16,
		borderRadius: 5,
	},
});
