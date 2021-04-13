import React, { useState } from 'react';
import { View, Pressable as Org, PressableProps } from 'react-native';
import { createStyle } from '../../providers/Theme';
import { useSounds } from '../../providers/Sounds';

const Pressable = ({
	onPressIn,
	onPressOut,
	disablePressSound = false,
	activeOpacity = 0.8,
	style,
	...props
}: PressablePropsType) => {
	const [isPressInStyle, setIsPressInStyle] = useState(false);
	const styles = useStyles({ isPressInStyle, activeOpacity });
	const { buttonSound } = useSounds();

	return (
		<Org
			{...props}
			style={[styles.Pressable, style]}
			onPressIn={(e) => {
				if (!disablePressSound) {
					buttonSound.replayAsync();
				}
				setIsPressInStyle(true);
				onPressIn && onPressIn(e);
			}}
			onPressOut={(e) => {
				setIsPressInStyle(false);
				onPressOut && onPressOut(e);
			}}
			android_disableSound
		/>
	);
};

export default Pressable;

const useStyles = createStyle({
	Pressable: {
		opacity: ({ isPressInStyle, activeOpacity }) => (isPressInStyle ? activeOpacity : 1),
	},
});

export interface PressablePropsType extends PressableProps, React.RefAttributes<View> {
	activeOpacity: number;
	disablePressSound: boolean;
}
