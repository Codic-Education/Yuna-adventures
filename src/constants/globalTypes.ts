import { NavigationProp } from '@react-navigation/native';
import { ReactElement } from 'react';
import { ImageStyle, TextStyle, ViewStyle } from 'react-native';

export interface ChildrenType {
	children: string | ReactElement | Array<ReactElement>;
}

export type StylePropertyType = ViewStyle | TextStyle | ImageStyle;

export interface CategoryType {
	titleId: string;
	//TODO: improve thumbnailSrc type
	thumbnailSrc: {};
}

export type ScreenProps = {
	navigation: NavigationProp<Record<string, object | undefined>>;
	route: { params: object; name: 'string'; key: 'string' };
};
