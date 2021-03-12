import React, { createContext, useContext, useState } from 'react';
import { ChildrenType } from '../constants/globalTypes';
import categoriesObj from '../assets/data/categories';
import scenesObj from '../assets//data/scenes';
import yunaObj, { YunaVariantsType } from '../assets//data/Yuna';

const DataContext = createContext<DataPropsType>({
	categories: {},
	scenes: {},
	yuna: {},
});

const DataProvider = ({ children }: ChildrenType) => {
	const [categories, setCategories] = useState(categoriesObj);
	const [scenes, setScenes] = useState(scenesObj);
	const [yuna, setYuna] = useState(yunaObj);

	return (
		<DataContext.Provider value={{ categories, scenes, yuna }}>
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
};
