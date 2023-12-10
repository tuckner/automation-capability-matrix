import { distance } from 'popmotion';
import { calcLength } from './delta-calc.mjs';

function isAxisDeltaZero(delta) {
    return delta.translate === 0 && delta.scale === 1;
}
function isDeltaZero(delta) {
    return isAxisDeltaZero(delta.x) && isAxisDeltaZero(delta.y);
}
function boxEquals(a, b) {
    return (a.x.min === b.x.min &&
        a.x.max === b.x.max &&
        a.y.min === b.y.min &&
        a.y.max === b.y.max);
}
function aspectRatio(box) {
    return calcLength(box.x) / calcLength(box.y);
}
function isCloseTo(a, b, max = 0.1) {
    return distance(a, b) <= max;
}

export { aspectRatio, boxEquals, isCloseTo, isDeltaZero };
