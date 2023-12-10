import { isForcedMotionValue } from '../../../motion/utils/is-forced-motion-value.mjs';
import { isMotionValue } from '../../../value/utils/is-motion-value.mjs';

function scrapeMotionValuesFromProps(props) {
    const { style } = props;
    const newValues = {};
    for (const key in style) {
        if (isMotionValue(style[key]) || isForcedMotionValue(key, props)) {
            newValues[key] = style[key];
        }
    }
    return newValues;
}

export { scrapeMotionValuesFromProps };
