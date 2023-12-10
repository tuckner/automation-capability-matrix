import { isMotionValue } from '../../../value/utils/is-motion-value.mjs';
import { scrapeMotionValuesFromProps as scrapeMotionValuesFromProps$1 } from '../../html/utils/scrape-motion-values.mjs';

function scrapeMotionValuesFromProps(props) {
    const newValues = scrapeMotionValuesFromProps$1(props);
    for (const key in props) {
        if (isMotionValue(props[key])) {
            const targetKey = key === "x" || key === "y" ? "attr" + key.toUpperCase() : key;
            newValues[targetKey] = props[key];
        }
    }
    return newValues;
}

export { scrapeMotionValuesFromProps };
