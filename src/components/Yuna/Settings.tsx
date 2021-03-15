import React from 'react';
import { useData } from '../../providers/Data';
import LottieView from 'lottie-react-native';
import { createStyle } from '../../providers/Theme';
import { getScaledWidth } from '../../utilities';

const Settings = () => {
	const { yuna } = useData();
	const styles = useStyles({ yunaWidth: yuna?.settings.w });
	return (
		<LottieView source={yuna.settings} autoPlay loop style={styles.Yuna} resizeMode="contain" />
	);
};

export default Settings;

const useStyles = createStyle({
	Yuna: {
		width: ({ yunaWidth }) => getScaledWidth(yunaWidth),
		position: 'absolute',
		bottom: 0,
		left: 0,
	},
});
