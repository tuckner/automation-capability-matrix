import { AnimationType } from '../render/utils/types.mjs';
import { useDomEvent } from '../events/use-dom-event.mjs';

/**
 *
 * @param props
 * @param ref
 * @internal
 */
function useFocusGesture({ whileFocus, visualElement, }) {
    const { animationState } = visualElement;
    const onFocus = () => {
        animationState && animationState.setActive(AnimationType.Focus, true);
    };
    const onBlur = () => {
        animationState && animationState.setActive(AnimationType.Focus, false);
    };
    useDomEvent(visualElement, "focus", whileFocus ? onFocus : undefined);
    useDomEvent(visualElement, "blur", whileFocus ? onBlur : undefined);
}

export { useFocusGesture };
