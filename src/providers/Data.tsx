import React, { createContext, useContext, useState } from 'react';
import { ChildrenType } from '../constants/globalTypes';
import categoriesObj from '../assets/data/categories';
import scenesObj from '../assets//data/scenes';
import yunaObj from '../assets//data/Yuna';
import splashObj from '../assets/data/splash';

const DataContext = createContext<DataPropsType>({
	categories: {},
	scenes: {},
	yuna: {},
	splash: {},
});

const DataProvider = ({ children }: ChildrenType) => {
	const [categories, setCategories] = useState(categoriesObj);
	const [scenes, setScenes] = useState(scenesObj);
	const [yuna, setYuna] = useState(yunaObj);
	const [splash, setsplash] = useState(splashObj);

	return (
		<DataContext.Provider value={{ categories, scenes, yuna, splash }}>
			{children}
		</DataContext.Provider>
	);
};

export default DataProvider;

export const useData = () => useContext<DataPropsType>(DataContext);

type DataPropsType = {
	categories: { [key: string]: any };
	scenes: { [key: string]: any };
	yuna: { [key: string]: any };
	splash: { [key: string]: any };
};
