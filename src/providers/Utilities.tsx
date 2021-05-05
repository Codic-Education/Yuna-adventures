import React, { createContext, useContext, useEffect, useState } from 'react';
import { ChildrenType } from '../constants/globalTypes';
import NetInfo from '@react-native-community/netinfo';

const UtilitiesContext = createContext<any>(null);

const UtilitiesProvider = ({ children, ...props }: ChildrenType) => {
	const [isOnline, setIsOnline] = useState(false);

	useEffect(() => {
		const unsubscribeNetInfo = NetInfo.addEventListener((state) => {
			state.isConnected && setIsOnline && setIsOnline(state.isConnected);
		});
		return () => {
			unsubscribeNetInfo();
		};
	}, []);

	return (
		<UtilitiesContext.Provider {...props} value={{ isOnline }}>
			{children}
		</UtilitiesContext.Provider>
	);
};

export default UtilitiesProvider;

export const useUtilities = () => useContext<{ isOnline: boolean }>(UtilitiesContext);
