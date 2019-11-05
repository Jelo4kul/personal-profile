import { Keyframes } from 'react-spring/renderprops'

export const createTransition = (scaleDuration, transformDuration) => (
    Keyframes.Spring(async next => {
        while (true) {
            await next({ transform: "scale(1)", from: { transform: "scale(0)" }, config: { duration: scaleDuration }, reset: false })
            await next({ transform: "translateY(20px)", from: { transform: "translateY(0px)" }, config: { duration: transformDuration }, reset: true })
            await next({ transform: "translateY(0px)", from: { transform: "translateY(20px)" }, config: { duration: transformDuration }, reset: true })
            await next({ transform: "translateY(20px)", from: { transform: "translateY(0px)" }, config: { duration: transformDuration }, reset: true })
        }
    })
);

export const createWormTransition = (scaleDuration, transformDuration) => (
    Keyframes.Spring(async next => {
        while (true) {
            await next({ transform: "scale(1)", from: { transform: "scale(0)" }, config: { duration: scaleDuration }, reset: false })
            await next({ transform: "translateX(20px)", from: { transform: "translateX(0px)" }, config: { duration: transformDuration }, reset: true })
            await next({ transform: "translateX(0px)", from: { transform: "translateX(20px)" }, config: { duration: transformDuration }, reset: true })
            await next({ transform: "translateX(20px)", from: { transform: "translateX(0px)" }, config: { duration: transformDuration }, reset: true })
        }
    })
);

export const createSTransition = (scaleDuration, transformDuration) => (
    Keyframes.Spring(async next => {
        while (true) {
            await next({ transform: "scale(1)", from: { transform: "scale(0)" }, config: { duration: scaleDuration }, reset: false })
            await next({ transform: "rotate(180deg)", from: { transform: "rotate(0deg)" }, config: { duration: transformDuration }, reset: true })
            await next({ transform: "rotate(0deg)", from: { transform: "rotate(180deg)" }, config: { duration: transformDuration }, reset: true })
            await next({ transform: "translateX(20px)", from: { transform: "translateX(0px)" }, config: { duration: transformDuration }, reset: true })
        }
    })
);