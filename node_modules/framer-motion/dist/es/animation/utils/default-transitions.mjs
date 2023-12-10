import { isKeyframesTarget } from './is-keyframes-target.mjs';

const underDampedSpring = () => ({
    type: "spring",
    stiffness: 500,
    damping: 25,
    restSpeed: 10,
});
const criticallyDampedSpring = (to) => ({
    type: "spring",
    stiffness: 550,
    damping: to === 0 ? 2 * Math.sqrt(550) : 30,
    restSpeed: 10,
});
const linearTween = () => ({
    type: "keyframes",
    ease: "linear",
    duration: 0.3,
});
const keyframes = (values) => ({
    type: "keyframes",
    duration: 0.8,
    values,
});
const defaultTransitions = {
    x: underDampedSpring,
    y: underDampedSpring,
    z: underDampedSpring,
    rotate: underDampedSpring,
    rotateX: underDampedSpring,
    rotateY: underDampedSpring,
    rotateZ: underDampedSpring,
    scaleX: criticallyDampedSpring,
    scaleY: criticallyDampedSpring,
    scale: criticallyDampedSpring,
    opacity: linearTween,
    backgroundColor: linearTween,
    color: linearTween,
    default: criticallyDampedSpring,
};
const getDefaultTransition = (valueKey, to) => {
    let transitionFactory;
    if (isKeyframesTarget(to)) {
        transitionFactory = keyframes;
    }
    else {
        transitionFactory =
            defaultTransitions[valueKey] || defaultTransitions.default;
    }
    return { to, ...transitionFactory(to) };
};

export { criticallyDampedSpring, getDefaultTransition, linearTween, underDampedSpring };
