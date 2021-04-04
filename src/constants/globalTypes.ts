import { NavigationProp } from '@react-navigation/native';
import { ReactElement } from 'react';
import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { AVPlaybackSource } from 'expo-av/build/AV';

export interface ChildrenType {
	children: string | ReactElement | Array<ReactElement>;
}

export type StylePropertyType = ViewStyle | TextStyle | ImageStyle;

export type LanguagesCodesType = 'en' | 'sv';

export interface CategoryType {
	titleId: string;
	thumbnailSrc: LottieSourceType;
	levels: LevelType[];
}

export interface LevelType {
	productId?: string;
	isPurchased: boolean;
	yunaSetVariant: string;
	items: ItemType[];
	quiz: {
		scene: string;
	};
}

export interface ItemType {
	scene: string;
	animationObject: AnimationObjectType;
	onClickAnimationObject: AnimationObjectType;
	thumbnailSrc: LottieAnimationObjectType;
	name: { [key in LanguagesCodesType]: AVPlaybackSource };
}

export type ScreenProps<T> = {
	navigation: NavigationProp<Record<string, object | undefined>>;
	route: { params: T; name: 'string'; key: 'string' };
};

interface LottieAnimationObjectType {
	v: string;
	fr: number;
	ip: number;
	op: number;
	w: number;
	h: number;
	nm: string;
	ddd: number;
	assets: any[];
	layers: any[];
}

export type LottieSourceType = LottieAnimationObjectType;

export interface AnimationObjectType {
	animationSrc: LottieSourceType;
	soundSrc?: AVPlaybackSource;
	disableSoundLoop?: boolean;
	onAnimationFinish?: () => void;
}

export type QuizProgressValueType = 0 | 1 | 2 | 3;
