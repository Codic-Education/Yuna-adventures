import { AVPlaybackSource } from 'expo-av/build/AV';
import React from 'react';
import { QuizProgressValueType } from '../../constants/globalTypes';
import { useData } from '../../providers/Data';
import { useIntl, LanguagesCodesType } from '../../providers/Intl';
import { createStyle } from '../../providers/Theme';
import InteractiveItem from '../InteractiveItem';

const Quiz = ({ progress, itemsData }: PropsType) => {
	const { yuna } = useData();
	const styles = useStyles();
	const { lang } = useIntl();

	return (
		<InteractiveItem
			animationObject={{
				animationSrc: yuna.talking,
				soundSrc: itemsData[progress]?.name[lang],
			}}
			onClickAnimationObject={{
				animationSrc: yuna.sounding,
				soundSrc: itemsData[progress]?.soundSrc,
			}}
			style={styles.Yuna}
			autoPlay
		/>
	);
};

export default Quiz;

const useStyles = createStyle({
	Yuna: { position: 'absolute', bottom: 0, left: 0 },
});

export interface PropsType {
	progress: QuizProgressValueType;
	itemsData: [
		{
			soundSrc: AVPlaybackSource;
			name: {
				[key in LanguagesCodesType]: AVPlaybackSource;
			};
		}
	];
}
