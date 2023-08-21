import React, {useEffect} from "react";


const MAX = 128;
const k = 0.4;

function appr(x: number) {
    return MAX * (1 - Math.exp((-k * x) / MAX));
}

const TRIGGER_THRESHOLD = 100
const SHOW_INDICATOR_THRESHOLD = 50


export function usePullToRefresh(
    ref: React.RefObject<HTMLDivElement>,
    onTrigger: () => void,
    top?: number
) {
    useEffect(() => {

        const el = ref.current;
        if (!el) return;

        // attach the event listener
        el.addEventListener("touchstart", handleTouchStart);

        function handleTouchStart(startEvent: TouchEvent) {
            const el = ref.current;
            if (!el) return;

            // get the initial Y position
            const initialY = startEvent.touches[0].clientY;

            el.addEventListener("touchmove", handleTouchMove);
            el.addEventListener("touchend", handleTouchEnd);

            function addPullIndicator(el: HTMLDivElement) {
                const indicator = el.querySelector(".pull-indicator");
                if (indicator) {
                    // already added

                    // make sure the arrow is not flipped
                    if (indicator.classList.contains("flip")) {
                        indicator.classList.remove("flip");
                    }
                    return;
                }

                const pullIndicator = document.createElement("div");
                pullIndicator.className = "pull-indicator";
                pullIndicator.innerHTML = "<span id='loader'/>";
                if (top) pullIndicator.style.top = top + "px"
                el.appendChild(pullIndicator);
            }

            function removePullIndicator(el: HTMLDivElement) {
                const pullIndicator = el.querySelector(".pull-indicator");
                if (pullIndicator) {
                    pullIndicator.remove();
                }
            }

            function flipArrow(el: HTMLDivElement) {
                const pullIndicator = el.querySelector(".pull-indicator");
                if (pullIndicator && !pullIndicator.classList.contains("flip")) {
                    pullIndicator.classList.add("flip");
                }
            }

            function handleTouchMove(moveEvent: TouchEvent) {
                const el = ref.current;
                if (!el) return;

                // get the current Y position
                const currentY = moveEvent.touches[0].clientY;

                // get the difference
                const dy = currentY - initialY;
                if (dy < 0) return;
                const parentEl = el.parentNode as HTMLDivElement;
                if (dy > TRIGGER_THRESHOLD) {
                    flipArrow(parentEl);
                } else if (dy > SHOW_INDICATOR_THRESHOLD) {
                    addPullIndicator(parentEl);
                } else {
                    removePullIndicator(parentEl);
                }


                // update the element's transform
                el.style.transform = `translateY(${appr(dy)}px)`;
            }

            function handleTouchEnd(endEvent: TouchEvent) {
                const el = ref.current;
                if (!el) return;

                // return the element to its initial position
                el.style.transform = "translateY(0)";
                removePullIndicator(el.parentNode as HTMLDivElement);

                // add transition
                el.style.transition = "transform 0.2s";

                // run the callback
                const y = endEvent.changedTouches[0].clientY;
                const dy = y - initialY;
                if (dy > TRIGGER_THRESHOLD) {
                    onTrigger();
                }

                // listen for transition end event
                el.addEventListener("transitionend", onTransitionEnd);

                // cleanup
                el.removeEventListener("touchmove", handleTouchMove);
                el.removeEventListener("touchend", handleTouchEnd);
            }

            function onTransitionEnd() {
                const el = ref.current;
                if (!el) return;

                // remove transition
                el.style.transition = "";

                // cleanup
                el.removeEventListener("transitionend", onTransitionEnd);
            }


        }


        return () => {
            // let's not forget to cleanup
            el.removeEventListener("touchstart", handleTouchStart);
        };
    }, [ref.current]);
}