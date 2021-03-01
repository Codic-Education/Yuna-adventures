import React, { createContext, useContext, useState } from 'react';
import { Dimensions } from 'react-native';
import initialTheme, { InitialThemeType } from '../constants/theme';
import { PaletteType } from '../constants/palette';
import { ChildrenType } from '../constants/globalTypes';
import { StylePropertyType } from '../constants/globalTypes';
//TODO: Improve types.

type StyleObjectType = {
	[key: string]: StylePropertyType | { [key: string]: any };
};
type StyleFunctionType = (theme: ThemeType) => StyleObjectType;

type CreateStylePropsType = StyleObjectType | StyleFunctionType;

interface ThemeType extends InitialThemeType {
	dimensions: {
		screenWidth: number;
		screenHeight: number;
	};
}
const StyleContext = createContext<(params1?: any, params2?: any) => any>(() => {});

const ThemeContext = createContext({
	setPaletteType: () => {},
	paletteType: '',
});

const ThemeProvider = ({ children }: ChildrenType) => {
	const [paletteType, setPaletteType] = useState<PaletteType>('light');
	const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');

	const theme: ThemeType = {
		...initialTheme,
		palette: { ...initialTheme.palette, type: paletteType },
		dimensions: { screenWidth, screenHeight },
	};

	const createStyle = (style: CreateStylePropsType, props: object) => {
		const styleObj = supplyStyleWithProps(
			typeof style === 'function' ? style(theme) : style,
			props
		);

		return styleObj;
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
