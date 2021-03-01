import { CategoryType } from '../../constants/globalTypes';

const categories: CategoriesType = {
	animals: {
		titleId: 'Category.animals.title',
		thumbnailSrc: require('./animals/thumbnail.json'),
	},
	vehicles: {
		titleId: 'Category.vehicles.title',
		thumbnailSrc: require('./vehicles/thumbnail.json'),
	},
};

export default categories;

interface CategoriesType {
	[name: string]: CategoryType;
}
