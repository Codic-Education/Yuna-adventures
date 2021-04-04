import React, { createContext, useContext, useEffect, useState } from 'react';
import { ChildrenType } from '../constants/globalTypes';
import categoriesObj from '../assets/data/categories';
import scenesObj from '../assets//data/scenes';
import yunaObj, { YunaVariantsType } from '../assets//data/Yuna';

import * as RNIAP from 'react-native-iap';
import { Platform } from 'react-native';
import levelsSkus from '../assets/data/categories/levelsSkus';

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
				connection && updatePurchasedLevelsState();
				await RNIAP.getProducts(Object.values(levelsSkus));
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const updatePurchasedLevelsState = async () => {
		try {
			const products = await RNIAP.getPurchaseHistory();
			const productIds = products.map(({ productId }) => productId);
			updateCategories(productIds);
		} catch (error) {
			console.log('IAP erro ', error.code, error.message, error);
		}
	};

	const updateCategories = (productIds: string[]) => {
		if (productIds.length) {
			setCategories((current) =>
				Object.fromEntries(
					Object.entries(current).map(([key, value]) => [
						key,
						{
							...value,
							levels: value.levels.map((level) => ({
								...level,
								isPurchased: !level.isPurchased
									? level?.productId
										? productIds.includes(level.productId)
										: false
									: level.isPurchased,
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

type DataPropsType = {
	categories: { [key: string]: any };
	scenes: { [key: string]: any };
	yuna: YunaVariantsType;
	updateCategories: (productsIds: string[]) => void;
};
