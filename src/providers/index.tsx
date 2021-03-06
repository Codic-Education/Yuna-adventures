import React from 'react';
import { ChildrenType } from '../constants/globalTypes';
import I18n from './Intl';
import Theme from './Theme';
import DataProvider from './Data';
import SoundProvide from './Sound';

const Index = ({ children }: ChildrenType) => {
	return (
		<SoundProvide>
			<DataProvider>
				<Theme>
					<I18n>{children}</I18n>
				</Theme>
			</DataProvider>
		</SoundProvide>
	);
};

export default Index;
