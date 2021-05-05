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
	color5: PaletteColor;
	color6: PaletteColor;
	color7: PaletteColor;
	color8: PaletteColor;
	color9: PaletteColor;
	color10: PaletteColor;
}

const palette: PaletteObjectType = {
	type: 'light',
	color0: { light: '#000000' },
	color1: { light: '#ffffff' },
	color2: { light: '#ADE5EF' },
	color3: { light: '#4E184B' },
	color4: { light: '#A8B0DA' },
	color5: { light: '#CC5252' },
	color6: { light: '#F0CD6E' },
	color7: { light: '#57BDCF' },
	color8: { light: '#EEEEEE' },
	color9: { light: '#ffbe00' },
	color10: { light: '#60c776' },
};

export default palette;
