import palette, { PaletteObjectType } from './palette';

export interface InitialThemeType {
	palette: PaletteObjectType;
}

export const fonts = {
	coiny: require('../assets/fonts/coiny.ttf'),
};

export default {
	palette,
};
