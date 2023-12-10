import { isBrowser } from '../utils/is-browser.mjs';

// We check for event support via functions in case they've been mocked by a testing suite.
const supportsPointerEvents = () => isBrowser && window.onpointerdown === null;
const supportsTouchEvents = () => isBrowser && window.ontouchstart === null;
const supportsMouseEvents = () => isBrowser && window.onmousedown === null;

export { supportsMouseEvents, supportsPointerEvents, supportsTouchEvents };
