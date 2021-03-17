import { AVPlaybackSource } from 'expo-av/build/AV';
import React from 'react';
import { QuizProgressValueType } from '../../constants/globalTypes';
import { useData } from '../../providers/Data';
import { useIntl, LanguagesCodesType } from '../../providers/Intl';
import { createStyle } from '../../providers/Theme';
import InteractiveItem from '../InteractiveItem';

const Quiz = ({ progress, itemsData }: QuizPropsType) => {
	const { yuna } = useData();
	const styles = useStyles();
	const { lang } = useIntl();

	return (
		<InteractiveItem
			animationObject={{
				animationSrc: yuna.talking,
				soundSrc: itemsData[progress]?.name[lang],
				disableSoundLoop: true,
			}}
			onClickAnimationObject={{
				animationSrc: yuna.sounding,
				soundSrc: itemsData[progress]?.soundSrc,
			}}
			style={styles.Yuna}
			renderAsClicked
		/>
	);
};

export default Quiz;

const useStyles = createStyle({
	Yuna: { position: 'absolute', bottom: 0, left: 0 },
});

export interface QuizPropsType {
	progress: QuizProgressValueType;
	itemsData:
		| [
				{
					soundSrc: AVPlaybackSource | undefined;
					name: {
						[key in LanguagesCodesType]: AVPlaybackSource;
					};
				}
		  ]
		| any;
}
