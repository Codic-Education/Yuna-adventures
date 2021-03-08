import React, { useEffect } from 'react';
import { t } from 'i18n-js';
import { Text, TextProps } from 'react-native';
import { useIntl } from '../providers/Intl';

const TranslatedText = ({ id, ...props }: PropsType) => {
	const { lang } = useIntl();

	useEffect(() => {
		// console.log('language: ', lang);
	}, [lang]);

	return <Text {...props}>{t(id)}</Text>;
};

export default TranslatedText;

interface PropsType extends TextProps {
	id: string;
}
