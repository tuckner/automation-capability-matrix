import { buildHTMLStyles } from '../../html/utils/build-styles.mjs';
import { calcSVGTransformOrigin } from './transform-origin.mjs';
import { buildSVGPath } from './path.mjs';

/**
 * Build SVG visual attrbutes, like cx and style.transform
 */
function buildSVGAttrs(state, { attrX, attrY, originX, originY, pathLength, pathSpacing = 1, pathOffset = 0, 
// This is object creation, which we try to avoid per-frame.
...latest }, options, transformTemplate) {
    buildHTMLStyles(state, latest, options, transformTemplate);
    state.attrs = state.style;
    state.style = {};
    const { attrs, style, dimensions } = state;
    /**
     * However, we apply transforms as CSS transforms. So if we detect a transform we take it from attrs
     * and copy it into style.
     */
    if (attrs.transform) {
        if (dimensions)
            style.transform = attrs.transform;
        delete attrs.transform;
    }
    // Parse transformOrigin
    if (dimensions &&
        (originX !== undefined || originY !== undefined || style.transform)) {
        style.transformOrigin = calcSVGTransformOrigin(dimensions, originX !== undefined ? originX : 0.5, originY !== undefined ? originY : 0.5);
    }
    // Treat x/y not as shortcuts but as actual attributes
    if (attrX !== undefined)
        attrs.x = attrX;
    if (attrY !== undefined)
        attrs.y = attrY;
    // Build SVG path if one has been defined
    if (pathLength !== undefined) {
        buildSVGPath(attrs, pathLength, pathSpacing, pathOffset, false);
    }
}

export { buildSVGAttrs };
