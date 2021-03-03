import React, { createContext, useContext, useState } from 'react';
import { ChildrenType } from '../constants/globalTypes';
import categoriesObj from '../data/categories';
import scenesObj from '../data/scenes';

const DataContext = createContext<DataPropsType>({ categories: {}, scenes: {} });

const DataProvider = ({ children }: ChildrenType) => {
	const [categories, setCategories] = useState(categoriesObj);
	const [scenes, setScenes] = useState(scenesObj);

	return <DataContext.Provider value={{ categories, scenes }}>{children}</DataContext.Provider>;
};

export default DataProvider;

export const useData = () => useContext<DataPropsType>(DataContext);

type DataPropsType = { categories: object; scenes: object };
