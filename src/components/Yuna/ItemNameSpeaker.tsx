import { AVPlaybackSource } from 'expo-av/build/AV';
import React, { Dispatch, SetStateAction } from 'react';
import { useData } from '../../providers/Data';
import { useIntl } from '../../providers/Intl';
import { createStyle } from '../../providers/Theme';
import InteractiveItem from '../InteractiveItem';

const ItemNameSpeaker = ({
	itemName,
	yunaSetVariant,
	isOnClickAnimationActiveState,
}: ItemNameSpeakerPropsType) => {
	const styles = useStyles();
	const {
		yuna: { [yunaSetVariant]: yunaSet },
	} = useData();
	const { lang } = useIntl();

	return (
		<InteractiveItem
			animationObject={{ animationSrc: yunaSet.waiting }}
			onClickAnimationObject={{ animationSrc: yunaSet.talking, soundSrc: itemName[lang] }}
			style={[styles.yunaPosition]}
			isOnClickAnimationActiveState={isOnClickAnimationActiveState}
		/>
	);
};

export default ItemNameSpeaker;
const useStyles = createStyle({
	yunaPosition: {
		position: 'absolute',
		bottom: 0,
		left: 0,
	},
});

export interface ItemNameSpeakerPropsType {
	yunaSetVariant: string;
	itemName: { [key: string]: AVPlaybackSource };
	isOnClickAnimationActiveState?: [boolean, Dispatch<SetStateAction<boolean>>];
}
