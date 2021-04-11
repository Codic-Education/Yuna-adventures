import React, { createContext, useContext, useEffect, useState } from 'react';
import {
	ChildrenType,
	LevelsPricesAndPurchaseStatesType,
	PURCHASE_STATE,
} from '../constants/globalTypes';
import categoriesObj from '../assets/data/categories';
import scenesObj from '../assets//data/scenes';
import yunaObj, { YunaVariantsType } from '../assets//data/Yuna';
import RNIAP, { PurchaseStateAndroid } from 'react-native-iap';
import levelsSkus from '../assets/data/categories/levelsSkus';
import asyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { storeReceiptInDB } from '../utilities';
import NetInfo from '@react-native-community/netinfo';

const DataContext = createContext<DataPropsType>({
	categories: {},
	scenes: {},
	yuna: {},
	updateCategories: () => {},
});

const DataProvider = ({ children }: ChildrenType) => {
	const isAndroid = Platform.OS === 'android';
	const [categories, setCategories] = useState(categoriesObj);
	const [scenes] = useState(scenesObj);
	const [yuna] = useState(yunaObj);
	const [isOnline, setIsOnline] = useState(false);

	useEffect(() => {
		isOnline && initializeIAPConnection();
	}, [isOnline]);

	useEffect(() => {
		const unsubscribeNetInfo = NetInfo.addEventListener((state) => {
			state.isConnected && setIsOnline(state.isConnected);
		});
		const purchaseUpdatedListener = RNIAP.purchaseUpdatedListener(async (purchase) => {
			try {
				if (isAndroid) {
					if (purchase.purchaseStateAndroid === PurchaseStateAndroid.PURCHASED) {
						updateCategories({
							[purchase.productId]: {
								purchaseState: PURCHASE_STATE.PURCHASED,
								isNewPurchased: true,
							},
						});
						addToStoredPurchasedLevels({
							[purchase.productId]: {
								purchaseState: PURCHASE_STATE.PURCHASED,
							},
						});
						await RNIAP.finishTransaction(purchase, false);
						storeReceiptInDB(purchase.transactionReceipt);
					} else {
						updateCategories({
							[purchase.productId]: {
								purchaseState:
									purchase.purchaseStateAndroid === PurchaseStateAndroid.PENDING
										? PURCHASE_STATE.PENDING
										: PURCHASE_STATE.UNPURCHASED,
							},
						});
					}
				}
			} catch (error) {
				console.log('PurchaseUpdatedListenerError: ', error);
			}
		});

		const purchaseErrorListener = RNIAP.purchaseErrorListener((error) => {
			console.log('PurchaseErrorListener: ', error);
		});

		return () => {
			purchaseUpdatedListener?.remove();
			purchaseErrorListener?.remove();
			RNIAP.endConnection();
			unsubscribeNetInfo();
		};
	}, []);

	const initializeIAPConnection = async () => {
		try {
			await RNIAP.initConnection();
			isAndroid && RNIAP.flushFailedPurchasesCachedAsPendingAndroid();
			await updateLocalPaidLevelsStatesFromCloud();
		} catch (error) {
			onFetchStoredLevelsPricesAndPurchaseStates((storedPurchasedLevelProductsIds) => {
				updateCategories(storedPurchasedLevelProductsIds);
			});
		}
	};

	const updateLocalPaidLevelsStatesFromCloud = async () => {
		try {
			const levelSkus = Object.values(levelsSkus);
			const products = await RNIAP.getProducts(levelSkus);
			const purchasedProducts = await RNIAP.getAvailablePurchases();

			const filteredPurchasedProductAndroid = isAndroid
				? purchasedProducts.filter(
						async ({
							purchaseStateAndroid,
							isAcknowledgedAndroid,
							purchaseToken,
							transactionReceipt,
						}) => {
							const isPurchased =
								purchaseStateAndroid === PurchaseStateAndroid.PURCHASED;
							if (isPurchased && !isAcknowledgedAndroid && purchaseToken) {
								await RNIAP.acknowledgePurchaseAndroid(purchaseToken);
								storeReceiptInDB(transactionReceipt);
							}
							return isPurchased;
						}
				  )
				: purchasedProducts;

			const purchasedProductIds = (isAndroid
				? filteredPurchasedProductAndroid
				: purchasedProducts
			).map(({ productId }) => productId);

			const updatedPaidLevelsData: LevelsPricesAndPurchaseStatesType = Object.fromEntries(
				products.map(({ productId, localizedPrice }) => [
					productId,
					{
						purchaseState: purchasedProductIds.includes(productId)
							? PURCHASE_STATE.PURCHASED
							: PURCHASE_STATE.UNPURCHASED,
						price: localizedPrice,
					},
				])
			);

			updateCategories(updatedPaidLevelsData);
			addToStoredPurchasedLevels(updatedPaidLevelsData);
		} catch (error) {
			console.log('updateLocalPaidLevelsStatesFromCloud: ', error);
			throw error;
		}
	};

	const updateCategories = (levelsPricesAndPurchaseStates: LevelsPricesAndPurchaseStatesType) => {
		if (Object.entries(levelsPricesAndPurchaseStates).length) {
			setCategories((current) =>
				Object.fromEntries(
					Object.entries(current).map(([key, value]) => [
						key,
						{
							...value,
							levels: value.levels.map((level) => ({
								...level,
								...(levelsPricesAndPurchaseStates[level.productId]
									? levelsPricesAndPurchaseStates[level.productId]
									: {}),
							})),
						},
					])
				)
			);
		}
	};

	return (
		<DataContext.Provider value={{ categories, scenes, yuna, updateCategories }}>
			{children}
		</DataContext.Provider>
	);
};

export default DataProvider;

export const useData = () => useContext<DataPropsType>(DataContext);

const onFetchStoredLevelsPricesAndPurchaseStates = async (
	callback: (storedLevelsPricesAndPurchaseStates: LevelsPricesAndPurchaseStatesType) => void
) => {
	try {
		const storedLevelsPricesAndPurchaseStates = await asyncStorage.getItem(
			'storedLevelsPricesAndPurchaseStates'
		);
		callback(JSON.parse(storedLevelsPricesAndPurchaseStates || '{}'));
	} catch (e) {}
};

export const addToStoredPurchasedLevels = async (
	levelsPricesAndPurchaseStatesToAddToStorage: LevelsPricesAndPurchaseStatesType
) => {
	try {
		onFetchStoredLevelsPricesAndPurchaseStates(async (storedLevelsPricesAndPurchaseStates) => {
			await asyncStorage.setItem(
				'storedLevelsPricesAndPurchaseStates',
				JSON.stringify({
					...storedLevelsPricesAndPurchaseStates,
					...levelsPricesAndPurchaseStatesToAddToStorage,
				})
			);
		});
	} catch (e) {}
};

type DataPropsType = {
	categories: { [key: string]: any };
	scenes: { [key: string]: any };
	yuna: YunaVariantsType;
	updateCategories: (levelsPricesAndPurchaseStates: LevelsPricesAndPurchaseStatesType) => void;
};
