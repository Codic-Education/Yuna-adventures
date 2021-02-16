import React, { createContext, useContext, useState } from 'react';
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import initialTheme, { ThemeType } from '../constants/theme';
import { PaletteType } from '../constants/palette';
import { ChildrenType } from '../constants/globalTypes';
//TODO: Improve types.
type StylePropertyType = ViewStyle | TextStyle | ImageStyle;

type StyleObjectType = {
	[key: string]: StylePropertyType | { [key: string]: any };
};
type StyleFunctionType = (theme: ThemeType) => StyleObjectType;

type CreateStylePropsType = StyleObjectType | StyleFunctionType;

const StyleContext = createContext<(params1?: any, params2?: any) => any>(() => {});

const ThemeContext = createContext({
	setPaletteType: () => {},
	paletteType: '',
});

const ThemeProvider = ({ children }: ChildrenType) => {
	const [paletteType, setPaletteType] = useState<PaletteType>('light');
	const theme: ThemeType = {
		...initialTheme,
		palette: { ...initialTheme.palette, type: paletteType },
	};

	const createStyle = (style: CreateStylePropsType, props: object) => {
		const styleObj = supplyStyleWithProps(
			typeof style === 'function' ? style(theme) : style,
			props
		);

		return StyleSheet.create(styleObj);
	};

	return (
		<ThemeContext.Provider value={{ paletteType, setPaletteType }}>
			<StyleContext.Provider value={createStyle}>{children}</StyleContext.Provider>
		</ThemeContext.Provider>
	);
};

export default ThemeProvider;

export const useTheme = () => useContext(ThemeContext);

export const createStyle = (style: CreateStylePropsType) => (props?: object) =>
	useContext(StyleContext)(style, props);

const supplyStyleWithProps = (
	styleObj: CreateStylePropsType,
	props: object
): CreateStylePropsType => {
	if (props) {
		return Object.fromEntries(
			Object.entries(styleObj).map(([key, value]) => {
				switch (typeof value) {
					case 'function':
						return [key, value(props)];
					case 'object':
						return [key, supplyStyleWithProps(value, props)];
					default:
						return [key, value];
				}
			})
		);
	} else {
		return styleObj;
	}
};
