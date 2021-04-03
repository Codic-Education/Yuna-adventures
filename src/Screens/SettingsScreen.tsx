import React from 'react';
import { View } from 'react-native';
import Clouds from '../components/Clouds';
import IconButton from '../components/inputs/IconButton';
import NavigationHeader from '../components/NavigationHeader';
import Scene from '../components/Scene';
import ScreenBase from '../components/ScreenBase';
import TranslatedText from '../components/TranslatedText';
import { ScreenProps } from '../constants/globalTypes';
import { useIntl } from '../providers/Intl';
import { useSound } from '../providers/BackgroundSound';
import { createStyle } from '../providers/Theme';
import { getScaledWidth } from '../utilities';
import Yuna from '../components/Yuna';
import scene from '../assets/animations/scene-settings.json';

const languagesFlags = {
	en: 'united-kingdom',
	sv: 'sweden',
};

const dimensions = {
	width: 1247,
	height: 630,
};

const SettingScreen = ({ navigation }: ScreenProps<undefined>) => {
	const { resumeBackgroundSound, pauseBackgroundSound, isBackgroundSoundActive } = useSound();
	const { lang, changeLang } = useIntl();
	const styles = useStyles();

	return (
		<ScreenBase style={styles.SettingsScreen}>
			<NavigationHeader variant="back" />
			<Clouds />
			<Scene lottieFileSrc={scene} filter={styles.sceneFilter} />
			<View style={styles.settingsBox}>
				<TranslatedText id="SettingsScreen.title" style={styles.title} />
				<View style={styles.buttonsContainer}>
					<IconButton
						touchableOpacityStyle={styles.iconButton}
						lottieFileSrc={require('../assets/icons/music.json')}
						inactive={!isBackgroundSoundActive}
						redStroke={!isBackgroundSoundActive}
						onPress={() => {
							isBackgroundSoundActive
								? pauseBackgroundSound()
								: resumeBackgroundSound();
						}}
					/>
					{Object.entries(languagesFlags).map(([code, flag]) => (
						<IconButton
							key={code}
							touchableOpacityStyle={styles.iconButton}
							flag={flag}
							inactive={code !== lang}
							onPress={() => {
								changeLang(code);
							}}
						/>
					))}
				</View>
			</View>
			<Yuna variant="settings" />
		</ScreenBase>
	);
};

export default SettingScreen;

const useStyles = createStyle(({ palette: { color0, color1, color3, type } }) => ({
	SettingsScreen: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	sceneFilter: {
		backgroundColor: color1[type],
		opacity: 0.2,
	},
	title: {
		color: color1[type],
		fontSize: 30,
		fontFamily: 'coiny',
		position: 'absolute',
		top: 10,
	},
	settingsBox: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: color3[type],
		width: getScaledWidth(dimensions.width),
		aspectRatio: dimensions.width / dimensions.height,
		borderWidth: getScaledWidth(15),
		borderRadius: getScaledWidth(dimensions.width) / 10,
		borderColor: color1[type],
		shadowOffset: { height: 5, width: 5 },
		shadowColor: color0[type],
		shadowOpacity: 0.2,
		elevation: 10,
	},
	buttonsContainer: {
		flexDirection: 'row',
		marginTop: 10,
	},
	iconButton: {
		marginRight: getScaledWidth(50),
		marginLeft: getScaledWidth(50),
		backgroundColor: color1[type],
		color: color3[type],
		borderWidth: 0,
		transform: [{ scale: 1.2 }],
	},
}));
