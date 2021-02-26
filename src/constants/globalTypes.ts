import { ReactElement } from 'react';
import {  ImageStyle, TextStyle, ViewStyle } from 'react-native';



export interface ChildrenType {
	children: string | ReactElement | Array<ReactElement>;

}
export type StylePropertyType = ViewStyle | TextStyle | ImageStyle 

