import { Platform } from 'react-native';

//Note: Paid products "levels" must be stored here.
const paidProducts = Platform.select({
	ios: {
		animalsLvl2: 'ya_animals_level2',
	},
	android: {
		animalsLvl2: 'ya_animals_lvl2',
	},
});

export default paidProducts;

//Note: Free products "levels" must be stored here.
export const freeProducts = {
	animalsLvl1: 'ya_animals_lvl1',
	vehiclesLvl1: 'ya_vehicles_lvl1',
};
