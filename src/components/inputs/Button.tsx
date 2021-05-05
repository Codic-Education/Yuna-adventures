import React from 'react';
import { Text } from 'react-native';
import Pressable, { PressablePropsType } from './Pressable';

const Button = ({ children, style, ...props }: PressablePropsType) => {
	return (
		<Pressable style={style} {...props}>
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
		</Pressable>
	);
};

export default Button;

Button.defaultProps = {
	style: {},
};

//Note: Don't use opacity to hide this component
