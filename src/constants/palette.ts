import { ColorValue } from 'react-native';

export type PaletteType = 'light';

export type PaletteColor = {
	[key in PaletteType]: ColorValue;
};

export interface PaletteObjectType {
	type: PaletteType;
	color0: PaletteColor;
	color1: PaletteColor;
	color2: PaletteColor;
	color3: PaletteColor;
	color4: PaletteColor;
}

const palette: PaletteObjectType = {
	type: 'light',
	color0: { light: '#000000' },
	color1: { light: '#ffffff' },
	color2: { light: '#ADE5EF' },
	color3: { light: '#4E184B' },
	color4: { light: '#5F95B3' },
};

export default palette;
