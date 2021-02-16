import React, { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import en from '../locales/en';
import sv from '../locales/sv';
import { ChildrenType } from '../constants/globalTypes';

type languageKeyType = 'en' | 'sv';

type languagesType = {
	[key in 'en' | 'sv']: object;
};

type ContextProps = {
	lang: 'en' | 'sv';
	setLang: Dispatch<SetStateAction<languageKeyType>>;
	langDir: 'rtl' | 'ltr';
};

const languages: languagesType = { en, sv };
i18n.translations = languages;

const I18nContext = createContext<ContextProps>({});

const I18nProvider = ({ children }: ChildrenType) => {
	const initialLang: languageKeyType = Object.keys(languages).includes(
		Localization.locale.split('-')[0]
	)
		? Localization.locale.split('-')[0]
		: 'en';

	const [lang, setLang] = useState(initialLang);
	const langDir = getLangDir(lang);
	i18n.locale = lang;

	return (
		<I18nContext.Provider value={{ lang, setLang, langDir }}>{children}</I18nContext.Provider>
	);
};

export const useIntl = () => useContext(I18nContext);

export default I18nProvider;

const getLangDir = (langCode: string): 'rtl' | 'ltr' => {
	return ['ar', 'arc', '	az', 'he', 'ku', 'fa', 'ur'].includes(langCode) ? 'rtl' : 'ltr';
};
