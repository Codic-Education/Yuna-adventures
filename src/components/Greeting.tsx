import React from 'react';
import { Text, View } from 'react-native';
import { useIntl } from '../providers/Intl';
import Button from '../components/inputs/Button';
import { useTheme, createStyle } from '../providers/Theme';
import { t } from 'i18n-js';

const Greeting = () => {
	const { setLang } = useIntl();
	const { setPaletteType } = useTheme();
	const styles = useStyles();

	return (
		<View style={styles.Greeting}>
			<View style={styles.buttonsContainer}>
				<Button onPress={() => setLang('en')} style={styles.button}>
					en
				</Button>
				<Button onPress={() => setPaletteType('light')} style={styles.button}>
					Light
				</Button>
				<Button onPress={() => setPaletteType('dark')} style={styles.button}>
					Dark
				</Button>
				<Button onPress={() => setLang('sv')} style={styles.button}>
					sv
				</Button>
			</View>
			<Text style={styles.text}>{t('Greeting.label')}</Text>
		</View>
	);
};

export default Greeting;

const useStyles = createStyle(({ palette: { color1, primary, secondary, type } }) => ({
	Greeting: {
		flex: 1,
		alignItems: 'center',
		paddingTop: 50,
		backgroundColor: secondary[type],
		color: secondary[type],
	},
	buttonsContainer: {
		marginBottom: 50,
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '75%',
	},
	button: {
		backgroundColor: primary[type],
		color: color1[type],
	},
	text: {
		color: color1[type],
	},
}));
