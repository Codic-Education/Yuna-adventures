import React from 'react';
import yuna from '../../assets/animations/yuna-settings.json';
import LottieView from 'lottie-react-native';
import { createStyle } from '../../providers/Theme';
import { getScaledWidth } from '../../utilities';

const Settings = () => {
	const styles = useStyles({ yunaWidth: yuna?.w });
	return <LottieView source={yuna} autoPlay loop style={styles.Yuna} resizeMode="contain" />;
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
