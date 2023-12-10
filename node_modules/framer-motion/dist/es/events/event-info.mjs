import { isTouchEvent } from '../gestures/utils/event-type.mjs';

/**
 * Filters out events not attached to the primary pointer (currently left mouse button)
 * @param eventHandler
 */
function filterPrimaryPointer(eventHandler) {
    return (event) => {
        const isMouseEvent = event instanceof MouseEvent;
        const isPrimaryPointer = !isMouseEvent ||
            (isMouseEvent && event.button === 0);
        if (isPrimaryPointer) {
            eventHandler(event);
        }
    };
}
const defaultPagePoint = { pageX: 0, pageY: 0 };
function pointFromTouch(e, pointType = "page") {
    const primaryTouch = e.touches[0] || e.changedTouches[0];
    const point = primaryTouch || defaultPagePoint;
    return {
        x: point[pointType + "X"],
        y: point[pointType + "Y"],
    };
}
function pointFromMouse(point, pointType = "page") {
    return {
        x: point[pointType + "X"],
        y: point[pointType + "Y"],
    };
}
function extractEventInfo(event, pointType = "page") {
    return {
        point: isTouchEvent(event)
            ? pointFromTouch(event, pointType)
            : pointFromMouse(event, pointType),
    };
}
const wrapHandler = (handler, shouldFilterPrimaryPointer = false) => {
    const listener = (event) => handler(event, extractEventInfo(event));
    return shouldFilterPrimaryPointer
        ? filterPrimaryPointer(listener)
        : listener;
};

export { extractEventInfo, wrapHandler };
