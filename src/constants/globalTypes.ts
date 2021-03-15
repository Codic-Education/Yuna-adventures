import { NavigationProp } from '@react-navigation/native';
import { ReactElement } from 'react';
import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { AVPlaybackSource } from 'expo-av/build/AV';

export interface ChildrenType {
	children: string | ReactElement | Array<ReactElement>;
}

export type StylePropertyType = ViewStyle | TextStyle | ImageStyle;

export interface CategoryType {
	titleId: string;
	thumbnailSrc: LottieSourceType;
	items: object;
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

export type AnimationObjectType = { animationSrc: LottieSourceType; soundSrc?: AVPlaybackSource };

export type QuizProgressValueType = 0 | 1 | 2 | 3;
