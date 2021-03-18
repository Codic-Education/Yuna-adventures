import { CategoryType } from '../../../constants/globalTypes';

const categories: CategoriesType = {
	animals: {
		titleId: 'Category.animals.title',
		thumbnailSrc: require('./animals/thumbnail.json'),
		levels: require('./animals').default,
	},
	vehicles: {
		titleId: 'Category.vehicles.title',
		thumbnailSrc: require('./vehicles/thumbnail.json'),
		levels: require('./vehicles').default,
	},
};

export default categories;

interface CategoriesType {
	[name: string]: CategoryType;
}
