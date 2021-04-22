import React, { useState } from 'react';
import { Animated } from 'react-native';
import {
	State,
	HandlerStateChangeEvent,
	PanGestureHandler,
	PanGestureHandlerEventPayload,
} from 'react-native-gesture-handler';
import { ChildrenType, StylePropertyType } from '../constants/globalTypes';
import { createStyle } from '../providers/Theme';

const DraggAbility = ({ children, style, disabled = false, isSticky }: DragAbilityPropsType) => {
	const [translateX] = useState(new Animated.Value(0));
	const [translateY] = useState(new Animated.Value(0));
	const [latestOffset, setLatestOffset] = useState({ x: 0, y: 0 });
	const onGestureEvent = Animated.event(
		[
			{
				nativeEvent: {
					translationX: translateX,
					translationY: translateY,
				},
			},
		],
		{ useNativeDriver: true }
	);

	const onHandlerStateChange = ({
		nativeEvent: { oldState, translationX, translationY },
	}: HandlerStateChangeEvent<PanGestureHandlerEventPayload>) => {
		if (oldState === State.ACTIVE) {
			const newLatestOffset = {
				x: latestOffset.x + translationX,
				y: latestOffset.y + translationY,
			};
			if (!isSticky) {
				translateX.setOffset(newLatestOffset.x);
				translateY.setOffset(newLatestOffset.y);
			}
			translateX.setValue(0);
			translateY.setValue(0);
			setLatestOffset(newLatestOffset);
		}
	};
	const styles = useStyles({ translateX, translateY });

	return (
		<PanGestureHandler
			onGestureEvent={!disabled ? onGestureEvent : undefined}
			onHandlerStateChange={!disabled ? onHandlerStateChange : undefined}
		>
			<Animated.View style={[style, styles.Draggable]}>{children}</Animated.View>
		</PanGestureHandler>
	);
};

export default DraggAbility;

const useStyles = createStyle({
	Draggable: {
		transform: ({ translateX, translateY }) => [{ translateX }, { translateY }],
	},
});

interface DragAbilityPropsType extends ChildrenType {
	style?: StylePropertyType;
	disabled?: boolean;
	isSticky?: boolean;
}
