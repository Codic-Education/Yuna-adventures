import React, { createContext, useContext, useEffect, useState } from 'react';
import { ChildrenType } from '../constants/globalTypes';
import categoriesObj from '../assets/data/categories';
import scenesObj from '../assets//data/scenes';
import yunaObj, { YunaVariantsType } from '../assets//data/Yuna';
import * as RNIAP from 'react-native-iap';
import { Platform } from 'react-native';
import levelsSkus from '../assets/data/categories/levelsSkus';
import asyncStorage from '@react-native-async-storage/async-storage';

const DataContext = createContext<DataPropsType>({
	categories: {},
	scenes: {},
	yuna: {},
	updateCategories: () => {},
});

const DataProvider = ({ children }: ChildrenType) => {
	const [categories, setCategories] = useState(categoriesObj);
	const [scenes] = useState(scenesObj);
	const [yuna] = useState(yunaObj);

	useEffect(() => {
		initilizeIAPConnection();
		const purchaseUpdateSubcription = RNIAP.purchaseUpdatedListener(
			async ({ transactionReceipt, transactionId }) => {
				const receipt = transactionReceipt;
				if (receipt) {
					try {
						if (Platform.OS === 'ios' && transactionId) {
							RNIAP.finishTransactionIOS(transactionId);
						}
					} catch (error) {
						console.log('ERROR IN APP: ', error);
					}
				}
			}
		);

		RNIAP.purchaseErrorListener((error) => {
			console.log('purchaseErrorListener: ', error);
		});

		return () => {
			purchaseUpdateSubcription.remove();
			RNIAP.endConnection();
		};
	}, []);

	const initilizeIAPConnection = async () => {
		await RNIAP.initConnection()
			.then(async (connection) => {
				if (connection) {
					updateLocalPurchasedLevelsStateFromCloud();
				} else {
					onFetchStoredLevelsPricesAndPurchaseStates(
						(storedPurchasedLevelProductsIds) => {
							updateCategories(storedPurchasedLevelProductsIds);
						}
					);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const updateLocalPurchasedLevelsStateFromCloud = async () => {
		try {
			const levelSkus = Object.values(levelsSkus);
			const products = await RNIAP.getProducts(levelSkus);
			const purchasedProducts = await RNIAP.getPurchaseHistory();
			const purchasedProductIds = purchasedProducts.map(({ productId }) => productId);
			const newLevelsData = Object.fromEntries(
				products.map(({ productId, localizedPrice }) => {
					return [
						productId,
						{
							isPurchased: purchasedProductIds.includes(productId),
							price: localizedPrice,
						},
					];
				})
			);
			updateCategories(newLevelsData);
			addToStoredPurchasedLevels(newLevelsData);
			// Note: the following lines uses to check if some of levelSkus doesn't exist in cloud.

			const allProductsIds = products.map(({ productId }) => productId);
			levelSkus.map((id) => {
				!allProductsIds.includes(id) &&
					console.log(
						'product with the following id ',
						id,
						'could not be found in cloud.'
					);
			});
		} catch (error) {
			console.log('IAP erro ', error.code, error.message, error);
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
								...(level.productId &&
								levelsPricesAndPurchaseStates[level.productId]
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

type LevelsPricesAndPurchaseStatesType = {
	[sku: string]: { isPurchased: boolean; price?: string };
};

type DataPropsType = {
	categories: { [key: string]: any };
	scenes: { [key: string]: any };
	yuna: YunaVariantsType;
	updateCategories: (levelsPricesAndPurchaseStates: LevelsPricesAndPurchaseStatesType) => void;
};
