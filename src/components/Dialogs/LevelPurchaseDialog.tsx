import React, { useEffect, useRef } from 'react';
import { View, Text, Dimensions, Platform } from 'react-native';
import { createStyle } from '../../providers/Theme';
import { getScaledHeight, getScaledWidth } from '../../utilities';
import TranslatedText from '../TranslatedText';
import LottieView from 'lottie-react-native';
import lockedLock from '../../assets/animations/lock-locked.json';
import unlockedLock from '../../assets/animations/lock-unlocked.json';
import yuna from '../../assets/animations/yuna-paid-level.json';
import key from '../../assets/animations/key.json';
import creditCard from '../../assets/animations/credit-card.json';
import keyCheckMark from '../../assets/animations/key-check-mark.json';
import Button from '../inputs/Button';
import { PURCHASE_STATE } from '../../constants/globalTypes';
import { useData } from '../../providers/Data';

const dimensions = {
	width: 1100,
	height: Dimensions.get('screen').height > 720 ? 650 : 720,
};

const LevelPurchaseDialog = ({
	price,
	onPurchaseSuccessAnimationFinish,
	onPressPurchaseButton,
	purchaseState = PURCHASE_STATE.UNPURCHASED,
	isNewPurchased = false,
}: LevelPurchaseDialogPropsType) => {
	const unlockAnimationRef = useRef(null);
	const { isOnline } = useData();
	const styles = useStyles({
		lockWidth: lockedLock.w,
		lockHeight: lockedLock.h,
		yunaWidth: yuna.w,
		unlockedLock: purchaseState === PURCHASE_STATE.PURCHASED && isNewPurchased,
		purchaseState,
	});

	useEffect(() => {
		purchaseState && unlockAnimationRef.current?.play();
	}, [purchaseState]);

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
					{price ? (
						<>
							<TranslatedText
								id="LevelPurchaseDialog.description"
								style={styles.description}
							/>
							<Text style={styles.price}>{price}</Text>
						</>
					) : (
						<TranslatedText
							id="LevelPurchaseDialog.descriptionWithoutPrice"
							style={styles.description}
						/>
					)}
				</View>
				<Button
					style={styles.buyButton}
					disabled={purchaseState !== PURCHASE_STATE.UNPURCHASED || !isOnline}
					onPress={onPressPurchaseButton}
				>
					{purchaseState === PURCHASE_STATE.UNPURCHASED ? (
						<LottieView
							autoPlay
							source={key}
							resizeMode="contain"
							style={styles.buyButtonIcon}
						/>
					) : purchaseState === PURCHASE_STATE.PENDING ? (
						<LottieView
							autoPlay
							source={creditCard}
							resizeMode="contain"
							style={styles.buyButtonIcon}
						/>
					) : (
						<LottieView
							autoPlay
							loop={false}
							source={keyCheckMark}
							resizeMode="contain"
							style={styles.buyButtonIcon}
						/>
					)}
				</Button>
			</View>
			<LottieView autoPlay source={yuna} resizeMode="contain" style={styles.yuna} />
		</View>
	);
};

export default LevelPurchaseDialog;

const useStyles = createStyle(
	({ palette: { color0, color1, color3, color6, color7, color8, color10, type } }) => ({
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
			top: getScaledHeight(Platform.OS === 'ios' ? -55 : -85),
			alignSelf: 'center',
			height: ({ lockHeight, unlockedLock }) =>
				unlockedLock ? 0 : getScaledHeight(lockHeight),
		},
		unlockedLock: {
			position: 'absolute',
			top: getScaledHeight(Platform.OS === 'ios' ? -55 : -85),
			alignSelf: 'center',
			height: ({ lockHeight, unlockedLock }) =>
				unlockedLock ? getScaledHeight(lockHeight) : 0,
			zIndex: 100,
		},
		title: {
			color: color1[type],
			fontSize: getScaledWidth(55),
			fontFamily: 'coiny',
			alignSelf: 'center',
			marginBottom: getScaledHeight(79),
			overflow: 'visible',
			...(Platform.OS === 'ios' ? { lineHeight: getScaledWidth(65) } : {}),
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
			backgroundColor: ({ purchaseState }) =>
				purchaseState === 1
					? color10[type]
					: purchaseState === PURCHASE_STATE.PENDING
					? color6[type]
					: color7[type],
			padding: getScaledWidth(100),
			paddingTop: getScaledWidth(15),
			paddingBottom: getScaledWidth(15),
			borderRadius: 10,
			maxWidth: getScaledWidth(500),
			textAlign: 'center',
			alignItems: 'center',
			position: 'absolute',
			bottom: getScaledHeight(93),
			alignSelf: 'center',
			borderWidth: getScaledWidth(10),
			borderColor: color8[type],
		},
		buyButtonIcon: {
			height: getScaledHeight(80),
		},
		yuna: {
			width: ({ yunaWidth }) => getScaledWidth(yunaWidth),
			position: 'absolute',
			bottom: 0,
			left: 0,
		},
	})
);

type LevelPurchaseDialogPropsType = {
	price?: string;
	purchaseState: PURCHASE_STATE;
	isNewPurchased: boolean;
	onPurchaseSuccessAnimationFinish: () => void;
	onPressPurchaseButton: () => void;
};
