import React from 'react';
import { View } from 'react-native';
import Clouds from '../components/Clouds';
import IconButton from '../components/inputs/IconButton';
import NavigationHeader from '../components/NavigationHeader';
import Scene from '../components/Scene';
import ScreenBase from '../components/ScreenBase';
import TranslatedText from '../components/TranslatedText';
import { ScreenProps } from '../constants/globalTypes';
import { useData } from '../providers/Data';
import { useIntl } from '../providers/Intl';
import { useSound } from '../providers/Sound';
import { createStyle } from '../providers/Theme';
import { getScaledHeight, getScaledWidth } from '../utilities';
import Yuna from '../components/Yuna';

const languagesFlags = {
	en: 'united-kingdom',
	sv: 'sweden',
};

const dimensions = {
	width: 1247,
	height: 630,
};

const SettingScreen = ({ navigation }: ScreenProps<undefined>) => {
	const { scenes } = useData();
	const { resumeBackgroundSound, pauseBackgroundSound, isBackgroundSoundActive } = useSound();
	const { lang, setLang } = useIntl();
	const styles = useStyles();

	return (
		<ScreenBase style={styles.SettingsScreen}>
			<NavigationHeader variant="back" />
			<Clouds />
			<Scene lottieFileSrc={scenes.settings.source} filter={styles.sceneFilter} />
			<TranslatedText id="SettingsScreen.title" style={styles.title} />
			<View style={styles.settingsBox}>
				<IconButton
					touchableOpacityStyle={styles.iconButton}
					packageName="MaterialIcons"
					iconName="audiotrack"
					inactive={!isBackgroundSoundActive}
					redStroke={!isBackgroundSoundActive}
					onPress={() => {
						isBackgroundSoundActive ? pauseBackgroundSound() : resumeBackgroundSound();
					}}
				/>
				{Object.entries(languagesFlags).map(([code, flag]) => (
					<IconButton
						key={code}
						touchableOpacityStyle={styles.iconButton}
						flag={flag}
						inactive={code !== lang}
						onPress={() => {
							setLang(code);
						}}
					/>
				))}
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
		color: color3[type],
		fontSize: 25,
		fontWeight: '700',
		marginTop: -getScaledHeight(125),
		marginBottom: getScaledHeight(50),
	},
	settingsBox: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: color3[type],
		width: getScaledWidth(dimensions.width),
		aspectRatio: dimensions.width / dimensions.height,
		borderWidth: 8,
		borderRadius: getScaledWidth(dimensions.width) / 10,
		borderColor: color1[type],
		shadowOffset: { height: 5, width: 5 },
		shadowColor: color0[type],
		shadowOpacity: 0.2,
		elevation: 10,
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
