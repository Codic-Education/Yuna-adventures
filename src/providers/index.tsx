import React from 'react';
import { ChildrenType } from '../constants/globalTypes';
import I18n from './Intl';
import Theme from './Theme';
import DataProvider from './Data';
import BackgroundSound from './BackgroundSound';

const Index = ({ children }: ChildrenType) => {
	return (
		<BackgroundSound>
			<DataProvider>
				<Theme>
					<I18n>{children}</I18n>
				</Theme>
			</DataProvider>
		</BackgroundSound>
	);
};

export default Index;
