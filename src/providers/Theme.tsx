import React, { createContext, useContext, useEffect, useState } from 'react';
import { Dimensions, StyleSheet, ScaledSize } from 'react-native';
import initialTheme, { InitialThemeType } from '../constants/theme';
import { PaletteType } from '../constants/palette';
import { ChildrenType } from '../constants/globalTypes';
import { StylePropertyType } from '../constants/globalTypes';

const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');

const StyleContext = createContext<(params1?: any, params2?: any) => any>(() => {});
const ThemeContext = createContext({
	setPaletteType: () => {},
	paletteType: '',
});

const ThemeProvider = ({ children }: ChildrenType) => {
	const [paletteType, setPaletteType] = useState<PaletteType>('light');
	const [dimensions, setDimensions] = useState({ screenWidth, screenHeight });
	const theme: ThemeType = {
		...initialTheme,
		palette: { ...initialTheme.palette, type: paletteType },
		dimensions,
	};

	useEffect(() => {
		Dimensions.addEventListener('change', handleScreenChange);
		return () => {
			Dimensions.removeEventListener('change', handleScreenChange);
		};
	}, []);

	const handleScreenChange = ({ screen: { width, height } }: { screen: ScaledSize }) => {
		setDimensions({ screenWidth: width, screenHeight: height });
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
						return Array.isArray(value)
							? [key, value]
							: [key, supplyStyleWithProps(value, props)];
					default:
						return [key, value];
				}
			})
		);
	} else {
		return styleObj;
	}
};

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
