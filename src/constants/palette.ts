import { ColorValue } from 'react-native';

export type PaletteType = 'light' | 'dark';

export type PaletteColor = {
	[key in PaletteType]: ColorValue;
};

export interface PaletteObjectType {
	type: PaletteType;
	primary: PaletteColor;
	secondary: PaletteColor;
	color1: PaletteColor;
}

const palette: PaletteObjectType = {
	type: 'light',
	primary: { light: '#5194A4', dark: '#1F84D3' },
	secondary: { light: '#F3F3F3', dark: '#171728' },
	color1: { light: '#202040', dark: '#FFFFFF' },
};

export default palette;
