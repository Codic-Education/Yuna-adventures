import React, { ReactElement } from 'react';
import Quiz, { QuizPropsType } from './Quiz';
import Settings from './Settings';

const Yuna = ({ variant, ...props }: PropsType): ComponentType => {
	const yunaVariants = {
		quiz: Quiz,
		settings: Settings,
	};

	const YunaComponent = yunaVariants[variant];
	return <YunaComponent {...props} />;
};

export default Yuna;

type PropsType = QuizVariantPropsType | SettingsVariantPropsType;

interface QuizVariantPropsType extends QuizPropsType {
	variant: 'quiz';
}

interface SettingsVariantPropsType {
	variant: 'settings';
}

type ComponentType = ReactElement<QuizPropsType> | ReactElement<undefined>;
