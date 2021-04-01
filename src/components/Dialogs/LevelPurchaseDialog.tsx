import React, { useEffect, useRef } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { createStyle } from '../../providers/Theme';
import { getScaledHeight, getScaledWidth } from '../../utilities';
import TranslatedText from '../TranslatedText';
import LottieView from 'lottie-react-native';
import lockedLock from '../../assets/animations/lock-locked.json';
import unlockedLock from '../../assets/animations/lock-unlocked.json';
import yuna from '../../assets/animations/yuna-paid-level.json';
import key from '../../assets/animations/key.json';
import Button from '../inputs/Button';

const dimensions = {
	width: 1100,
	height: Dimensions.get('screen').height > 720 ? 650 : 720,
};
console.log(Dimensions.get('screen').height);
const LevelPurchaseDialog = ({
	price = '0',
	onPurchaseSuccessAnimationFinish,
	onPressPurchaseButton,
	hasBeenPurchased = false,
}: LevelPurchaseDialogPropsType) => {
	const unlockAnimationRef = useRef(null);
	const styles = useStyles({
		lockedLockHeight: lockedLock.h,
		unlockedLockHeight: unlockedLock.h,
		yunaWidth: yuna.w,
		keyWidth: key.w,
		haveBeenPurchased: hasBeenPurchased,
	});

	useEffect(() => {
		hasBeenPurchased && unlockAnimationRef.current?.play();
	}, [hasBeenPurchased]);

	return (
		<View style={styles.DialogBase}>
			<View style={styles.LevelPurchaseDialog}>
				<LottieView
					autoPlay
					source={lockedLock}
					resizeMode="contain"
					style={styles.lockedLock}
				/>
				<LottieView
					ref={unlockAnimationRef}
					source={unlockedLock}
					resizeMode="contain"
					style={styles.unlockedLock}
					loop={false}
					onAnimationFinish={onPurchaseSuccessAnimationFinish}
				/>
				<TranslatedText id="LevelPurchaseDialog.title" style={styles.title} />
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'center',
					}}
				>
					<TranslatedText
						id="LevelPurchaseDialog.description"
						style={styles.description}
					/>
					<Text style={styles.price}>{price}</Text>
				</View>
				<Button
					style={styles.buyButton}
					disabled={hasBeenPurchased}
					onPress={onPressPurchaseButton}
				>
					<LottieView
						autoPlay
						source={key}
						resizeMode="contain"
						style={styles.key}
						onAnimationFinish={onPurchaseSuccessAnimationFinish}
					/>
				</Button>
			</View>
			<LottieView autoPlay source={yuna} resizeMode="contain" style={styles.yuna} />
		</View>
	);
};

export default LevelPurchaseDialog;

const useStyles = createStyle(({ palette: { color0, color1, color3, color7, color8, type } }) => ({
	DialogBase: {
		width: '100%',
		height: '100%',
		backgroundColor: `${color0[type].toString()}80`,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
	},
	LevelPurchaseDialog: {
		width: getScaledWidth(dimensions.width),
		height: getScaledHeight(dimensions.height),
		backgroundColor: color3[type],
		borderWidth: getScaledWidth(15),
		borderRadius: 20,
		padding: 20,
		paddingTop: getScaledHeight(120),
		borderColor: color1[type],
		position: 'relative',
	},
	lockedLock: {
		position: 'absolute',
		top: getScaledHeight(-90),
		alignSelf: 'center',
		height: ({ lockedLockHeight, haveBeenPurchased }) =>
			haveBeenPurchased ? 0 : getScaledHeight(lockedLockHeight),
	},
	unlockedLock: {
		position: 'absolute',
		top: getScaledHeight(-90),
		alignSelf: 'center',
		height: ({ unlockedLockHeight, haveBeenPurchased }) =>
			haveBeenPurchased ? getScaledHeight(unlockedLockHeight) : 0,
		zIndex: 100,
	},
	title: {
		color: color1[type],
		fontSize: getScaledWidth(55),
		fontFamily: 'coiny',
		alignSelf: 'center',
		marginBottom: getScaledHeight(79),
	},
	description: {
		color: color1[type],
		fontSize: getScaledWidth(35),
	},
	price: {
		fontSize: getScaledWidth(35),
		color: color1[type],
		fontWeight: 'bold',
	},
	buyButton: {
		backgroundColor: color7[type],
		padding: 50,
		paddingTop: 3,
		paddingBottom: 3,
		borderRadius: 10,
		maxWidth: getScaledWidth(500),
		display: 'flex',
		textAlign: 'center',
		alignItems: 'center',
		position: 'absolute',
		bottom: getScaledHeight(93),
		alignSelf: 'center',
		borderWidth: getScaledWidth(10),
		borderColor: color8[type],
	},
	key: {
		width: ({ keyWidth }) => getScaledWidth(keyWidth),
	},
	yuna: {
		width: ({ yunaWidth }) => getScaledWidth(yunaWidth),
		position: 'absolute',
		bottom: 0,
		left: 0,
	},
}));

type LevelPurchaseDialogPropsType = {
	price: string;
	hasBeenPurchased: boolean;
	onPurchaseSuccessAnimationFinish: () => void;
	onPressPurchaseButton: () => void;
};
