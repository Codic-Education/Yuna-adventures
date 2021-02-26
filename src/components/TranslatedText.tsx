import React from 'react';
import { t } from 'i18n-js';
import { Text, TextProps } from 'react-native';

const TranslatedText = ({ id, ...props }: PropsType) => {
	return <Text {...props}>{t(id)}</Text>;
};

export default TranslatedText;

interface PropsType extends TextProps {
	id: string;
}
