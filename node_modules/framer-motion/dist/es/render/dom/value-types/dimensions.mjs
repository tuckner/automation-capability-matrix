import { number, px, percent, degrees, vw, vh } from 'style-value-types';
import { testValueType } from './test.mjs';
import { auto } from './type-auto.mjs';

/**
 * A list of value types commonly used for dimensions
 */
const dimensionValueTypes = [number, px, percent, degrees, vw, vh, auto];
/**
 * Tests a dimensional value against the list of dimension ValueTypes
 */
const findDimensionValueType = (v) => dimensionValueTypes.find(testValueType(v));

export { dimensionValueTypes, findDimensionValueType };
