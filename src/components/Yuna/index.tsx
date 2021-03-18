import React, { ReactElement } from 'react';
import Quiz, { QuizPropsType } from './Quiz';
import Settings from './Settings';
import ItemNameSpeaker, { ItemNameSpeakerPropsType } from './ItemNameSpeaker';

const Yuna = ({ variant, ...props }: YunaPropsType): YunaComponentType => {
	const yunaVariants = {
		quiz: Quiz,
		settings: Settings,
		['item-name-speaker']: ItemNameSpeaker,
	};

	const YunaComponent = yunaVariants[variant];
	return <YunaComponent {...props} />;
};

export default Yuna;

type YunaPropsType =
	| QuizVariantPropsType
	| SettingsVariantPropsType
	| ItemNameSpeakerVariantPropsType;

interface QuizVariantPropsType extends QuizPropsType {
	variant: 'quiz';
}

interface SettingsVariantPropsType {
	variant: 'settings';
}

interface ItemNameSpeakerVariantPropsType extends ItemNameSpeakerPropsType {
	variant: 'item-name-speaker';
}

type YunaComponentType = ReactElement<QuizPropsType> | ReactElement<undefined>;
