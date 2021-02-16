import React from 'react';
import { ChildrenType } from '../constants/globalTypes';
import I18n from './Intl';
import Theme from './Theme';

const Index = ({ children }: ChildrenType) => {
	return (
		<Theme>
			<I18n>{children}</I18n>
		</Theme>
	);
};

export default Index;
