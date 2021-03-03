import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { ChildrenType } from '../../constants/globalTypes';

const Button = ({ children, style, ...props }: Props) => {
	return (
		<TouchableOpacity style={style} activeOpacity={0.8} {...props}>
			{typeof children === 'string' ? (
				<Text
					style={{
						color: style.color ? style.color : '#000000',
					}}
				>
					{children}
				</Text>
			) : (
				children
			)}
		</TouchableOpacity>
	);
};

export default Button;

interface Props extends TouchableOpacityProps, ChildrenType {
	style?: any;
}

Button.defaultProps = {
	style: {},
};
