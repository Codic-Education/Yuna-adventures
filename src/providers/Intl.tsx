import React, {
	createContext,
	Dispatch,
	SetStateAction,
	useContext,
	useEffect,
	useState,
} from 'react';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import en from '../locales/en';
import sv from '../locales/sv';
import { ChildrenType } from '../constants/globalTypes';
import asyncStorage from '@react-native-async-storage/async-storage';

const languages: LanguagesType = { en, sv };
i18n.translations = languages;

const I18nContext = createContext<ContextProps>({});

const I18nProvider = ({ children }: ChildrenType) => {
	const initialLangCode: LanguagesCodesType = Object.keys(languages).includes(
		Localization.locale.split('-')[0]
	)
		? Localization.locale.split('-')[0]
		: 'en';

	const [langCode, setLangCode] = useState(initialLangCode);
	const langDir = getLangDir(langCode);
	i18n.locale = langCode;

	const changeLang = async (langCode: LanguagesCodesType) => {
		try {
			await asyncStorage.setItem('lang', langCode);
			setLangCode(langCode);
		} catch (e) {}
	};

	const onFetchStoredLangCode = async (
		callback: (storedLangCode: LanguagesCodesType | null) => void
	) => {
		try {
			const storedLangCode = await asyncStorage.getItem('lang');
			(Object.keys(languages).includes(storedLangCode) || storedLangCode === null) &&
				callback(storedLangCode);
		} catch (e) {}
	};

	useEffect(() => {
		onFetchStoredLangCode((langCode) => {
			if (langCode !== null) {
				setLangCode(langCode);
			} else {
				changeLang(initialLangCode);
			}
		});
	}, []);

	return (
		<I18nContext.Provider value={{ lang: langCode, changeLang, langDir }}>
			{children}
		</I18nContext.Provider>
	);
};

export const useIntl = () => useContext(I18nContext);

export default I18nProvider;

const getLangDir = (langCode: string): 'rtl' | 'ltr' => {
	return ['ar', 'arc', 'az', 'he', 'ku', 'fa', 'ur'].includes(langCode) ? 'rtl' : 'ltr';
};

export type LanguagesCodesType = 'en' | 'sv';

type LanguagesType = {
	[key in LanguagesCodesType]: object;
};

type ContextProps = {
	lang: LanguagesCodesType;
	changeLang: (langCode: LanguagesCodesType) => void;
	langDir: 'rtl' | 'ltr';
};
