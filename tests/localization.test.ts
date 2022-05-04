/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import { en, pt } from '@src/localization/languages';

test('all languages have the same keys', () => {
	const compareObjects = (obj1: Object, obj2: Object) => {
		const keys1 = Object.keys(obj1);
		const keys2 = Object.keys(obj2);
		expect(keys1).toEqual(keys2);

		for (const key of keys1) {
			// @ts-ignore
			const objEn = obj1[key];
			// @ts-ignore
			const objPt = obj2[key];

			if (typeof objEn === 'object' && typeof objPt === 'object') {
				compareObjects(objEn, objPt);
			}
		}
	};
	compareObjects(en, pt);
});
