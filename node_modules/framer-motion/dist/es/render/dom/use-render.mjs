import { createElement } from 'react';
import { useHTMLProps } from '../html/use-props.mjs';
import { filterProps } from './utils/filter-props.mjs';
import { isSVGComponent } from './utils/is-svg-component.mjs';
import { useSVGProps } from '../svg/use-props.mjs';

function createUseRender(forwardMotionProps = false) {
    const useRender = (Component, props, projectionId, ref, { latestValues }, isStatic) => {
        const useVisualProps = isSVGComponent(Component)
            ? useSVGProps
            : useHTMLProps;
        const visualProps = useVisualProps(props, latestValues, isStatic);
        const filteredProps = filterProps(props, typeof Component === "string", forwardMotionProps);
        const elementProps = {
            ...filteredProps,
            ...visualProps,
            ref,
        };
        if (projectionId) {
            elementProps["data-projection-id"] = projectionId;
        }
        return createElement(Component, elementProps);
    };
    return useRender;
}

export { createUseRender };
