interface ViewBoxDimensionsType {
	width: number;
	height: number;
}

export const getViewBox = (viewBoxDimensions: ViewBoxDimensionsType): string => {
	return `0 0 ${viewBoxDimensions.width} ${viewBoxDimensions.height}`;
};

export const getSvgHeightByCustomWidth = (
	viewBoxDimensions: ViewBoxDimensionsType,
	customWidth: number
): number => {
	return (viewBoxDimensions.height / viewBoxDimensions.width) * customWidth;
};
