import { inertia, animate } from 'popmotion';
import { secondsToMilliseconds } from '../../utils/time-conversion.mjs';
import { isEasingArray, easingDefinitionToFunction } from './easing.mjs';
import { isAnimatable } from './is-animatable.mjs';
import { getDefaultTransition } from './default-transitions.mjs';
import { warning } from 'hey-listen';
import { getAnimatableNone } from '../../render/dom/value-types/animatable-none.mjs';
import { instantAnimationState } from '../../utils/use-instant-transition-state.mjs';
import { resolveFinalValueInKeyframes } from '../../utils/resolve-value.mjs';
import { delay } from '../../utils/delay.mjs';

/**
 * Decide whether a transition is defined on a given Transition.
 * This filters out orchestration options and returns true
 * if any options are left.
 */
function isTransitionDefined({ when, delay: _delay, delayChildren, staggerChildren, staggerDirection, repeat, repeatType, repeatDelay, from, ...transition }) {
    return !!Object.keys(transition).length;
}
let legacyRepeatWarning = false;
/**
 * Convert Framer Motion's Transition type into Popmotion-compatible options.
 */
function convertTransitionToAnimationOptions({ ease, times, yoyo, flip, loop, ...transition }) {
    const options = { ...transition };
    if (times)
        options["offset"] = times;
    /**
     * Convert any existing durations from seconds to milliseconds
     */
    if (transition.duration)
        options["duration"] = secondsToMilliseconds(transition.duration);
    if (transition.repeatDelay)
        options.repeatDelay = secondsToMilliseconds(transition.repeatDelay);
    /**
     * Map easing names to Popmotion's easing functions
     */
    if (ease) {
        options["ease"] = isEasingArray(ease)
            ? ease.map(easingDefinitionToFunction)
            : easingDefinitionToFunction(ease);
    }
    /**
     * Support legacy transition API
     */
    if (transition.type === "tween")
        options.type = "keyframes";
    /**
     * TODO: These options are officially removed from the API.
     */
    if (yoyo || loop || flip) {
        warning(!legacyRepeatWarning, "yoyo, loop and flip have been removed from the API. Replace with repeat and repeatType options.");
        legacyRepeatWarning = true;
        if (yoyo) {
            options.repeatType = "reverse";
        }
        else if (loop) {
            options.repeatType = "loop";
        }
        else if (flip) {
            options.repeatType = "mirror";
        }
        options.repeat = loop || yoyo || flip || transition.repeat;
    }
    /**
     * TODO: Popmotion 9 has the ability to automatically detect whether to use
     * a keyframes or spring animation, but does so by detecting velocity and other spring options.
     * It'd be good to introduce a similar thing here.
     */
    if (transition.type !== "spring")
        options.type = "keyframes";
    return options;
}
/**
 * Get the delay for a value by checking Transition with decreasing specificity.
 */
function getDelayFromTransition(transition, key) {
    var _a, _b;
    const valueTransition = getValueTransition(transition, key) || {};
    return (_b = (_a = valueTransition.delay) !== null && _a !== void 0 ? _a : transition.delay) !== null && _b !== void 0 ? _b : 0;
}
function hydrateKeyframes(options) {
    if (Array.isArray(options.to) && options.to[0] === null) {
        options.to = [...options.to];
        options.to[0] = options.from;
    }
    return options;
}
function getPopmotionAnimationOptions(transition, options, key) {
    if (Array.isArray(options.to) && transition.duration === undefined) {
        transition.duration = 0.8;
    }
    hydrateKeyframes(options);
    /**
     * Get a default transition if none is determined to be defined.
     */
    if (!isTransitionDefined(transition)) {
        transition = {
            ...transition,
            ...getDefaultTransition(key, options.to),
        };
    }
    return {
        ...options,
        ...convertTransitionToAnimationOptions(transition),
    };
}
/**
 *
 */
function getAnimation(key, value, target, transition, onComplete) {
    const valueTransition = getValueTransition(transition, key) || {};
    let origin = valueTransition.from !== undefined ? valueTransition.from : value.get();
    const isTargetAnimatable = isAnimatable(key, target);
    if (origin === "none" && isTargetAnimatable && typeof target === "string") {
        /**
         * If we're trying to animate from "none", try and get an animatable version
         * of the target. This could be improved to work both ways.
         */
        origin = getAnimatableNone(key, target);
    }
    else if (isZero(origin) && typeof target === "string") {
        origin = getZeroUnit(target);
    }
    else if (!Array.isArray(target) &&
        isZero(target) &&
        typeof origin === "string") {
        target = getZeroUnit(origin);
    }
    const isOriginAnimatable = isAnimatable(key, origin);
    warning(isOriginAnimatable === isTargetAnimatable, `You are trying to animate ${key} from "${origin}" to "${target}". ${origin} is not an animatable value - to enable this animation set ${origin} to a value animatable to ${target} via the \`style\` property.`);
    function start() {
        const options = {
            from: origin,
            to: target,
            velocity: value.getVelocity(),
            onComplete,
            onUpdate: (v) => value.set(v),
        };
        return valueTransition.type === "inertia" ||
            valueTransition.type === "decay"
            ? inertia({ ...options, ...valueTransition })
            : animate({
                ...getPopmotionAnimationOptions(valueTransition, options, key),
                onUpdate: (v) => {
                    options.onUpdate(v);
                    valueTransition.onUpdate && valueTransition.onUpdate(v);
                },
                onComplete: () => {
                    options.onComplete();
                    valueTransition.onComplete && valueTransition.onComplete();
                },
            });
    }
    function set() {
        const finalTarget = resolveFinalValueInKeyframes(target);
        value.set(finalTarget);
        onComplete();
        valueTransition.onUpdate && valueTransition.onUpdate(finalTarget);
        valueTransition.onComplete && valueTransition.onComplete();
        return { stop: () => { } };
    }
    return !isOriginAnimatable ||
        !isTargetAnimatable ||
        valueTransition.type === false
        ? set
        : start;
}
function isZero(value) {
    return (value === 0 ||
        (typeof value === "string" &&
            parseFloat(value) === 0 &&
            value.indexOf(" ") === -1));
}
function getZeroUnit(potentialUnitType) {
    return typeof potentialUnitType === "number"
        ? 0
        : getAnimatableNone("", potentialUnitType);
}
function getValueTransition(transition, key) {
    return transition[key] || transition["default"] || transition;
}
/**
 * Start animation on a MotionValue. This function is an interface between
 * Framer Motion and Popmotion
 */
function startAnimation(key, value, target, transition = {}) {
    if (instantAnimationState.current) {
        transition = { type: false };
    }
    return value.start((onComplete) => {
        let controls;
        const animation = getAnimation(key, value, target, transition, onComplete);
        const delayBy = getDelayFromTransition(transition, key);
        const start = () => (controls = animation());
        let cancelDelay;
        if (delayBy) {
            cancelDelay = delay(start, secondsToMilliseconds(delayBy));
        }
        else {
            start();
        }
        return () => {
            cancelDelay && cancelDelay();
            controls && controls.stop();
        };
    });
}

export { convertTransitionToAnimationOptions, getDelayFromTransition, getPopmotionAnimationOptions, getValueTransition, getZeroUnit, hydrateKeyframes, isTransitionDefined, isZero, startAnimation };
