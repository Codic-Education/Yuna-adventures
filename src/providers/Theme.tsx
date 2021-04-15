import React, { createContext, useContext, useEffect, useState } from 'react';
import { Dimensions, StyleSheet, ScaledSize } from 'react-native';
import initialTheme, { InitialThemeType, fonts } from '../constants/theme';
import { PaletteType } from '../constants/palette';
import { ChildrenType } from '../constants/globalTypes';
import { StylePropertyType } from '../constants/globalTypes';
import { useFonts } from 'expo-font';

const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');

const StyleContext = createContext<any>(null);
const ThemeContext = createContext<any>(null);

const ThemeProvider = ({ children }: ChildrenType) => {
	useFonts(fonts);
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

	const createStyle = <A extends unknown>(style: CreateStylePropsType<A>, props: any) => {
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

export const createStyle = <A extends unknown>(style: CreateStylePropsType<A>) => (
	props?: any
): { [key in keyof A]: StylePropertyType } => useContext(StyleContext)(style, props);

const supplyStyleWithProps = <T extends unknown>(
	styleObj: CreateStylePropsType<T>,
	props: object
): CreateStylePropsType<any> => {
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

type StyleObjectType<A> = {
	[key in keyof A]:
		| StylePropertyType
		| {
				[k in keyof StylePropertyType]:
					| ((props: any) => StylePropertyType[k])
					| StylePropertyType[k];
		  };
};
type StyleFunctionType<A> = (theme: ThemeType) => StyleObjectType<A>;

type CreateStylePropsType<A> = StyleObjectType<A> | StyleFunctionType<A>;

interface ThemeType extends InitialThemeType {
	dimensions: {
		screenWidth: number;
		screenHeight: number;
	};
}
