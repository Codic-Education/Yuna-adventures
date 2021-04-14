import React from 'react';
import { ChildrenType } from '../constants/globalTypes';
import I18n from './Intl';
import Theme from './Theme';
import DataProvider from './Data';
import BackgroundSound from './BackgroundSound';
import SoundsProvider from './Sounds';

const Index = ({ children }: ChildrenType) => {
	return (
		<BackgroundSound>
			<SoundsProvider>
				<DataProvider>
					<Theme>
						<I18n>{children}</I18n>
					</Theme>
				</DataProvider>
			</SoundsProvider>
		</BackgroundSound>
	);
};

export default Index;
