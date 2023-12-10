import { buildHTMLStyles } from './utils/build-styles.mjs';
import { isCSSVariable } from '../dom/utils/is-css-variable.mjs';
import { transformProps } from './utils/transform.mjs';
import { scrapeMotionValuesFromProps } from './utils/scrape-motion-values.mjs';
import { renderHTML } from './utils/render.mjs';
import { getDefaultValueType } from '../dom/value-types/defaults.mjs';
import { measureViewportBox } from '../../projection/utils/measure.mjs';
import { DOMVisualElement } from '../dom/DOMVisualElement.mjs';

function getComputedStyle(element) {
    return window.getComputedStyle(element);
}
class HTMLVisualElement extends DOMVisualElement {
    readValueFromInstance(instance, key) {
        if (transformProps.has(key)) {
            const defaultType = getDefaultValueType(key);
            return defaultType ? defaultType.default || 0 : 0;
        }
        else {
            const computedStyle = getComputedStyle(instance);
            const value = (isCSSVariable(key)
                ? computedStyle.getPropertyValue(key)
                : computedStyle[key]) || 0;
            return typeof value === "string" ? value.trim() : value;
        }
    }
    measureInstanceViewportBox(instance, { transformPagePoint }) {
        return measureViewportBox(instance, transformPagePoint);
    }
    build(renderState, latestValues, options, props) {
        buildHTMLStyles(renderState, latestValues, options, props.transformTemplate);
    }
    scrapeMotionValuesFromProps(props) {
        return scrapeMotionValuesFromProps(props);
    }
    renderInstance(instance, renderState, styleProp, projection) {
        renderHTML(instance, renderState, styleProp, projection);
    }
}

export { HTMLVisualElement, getComputedStyle };
