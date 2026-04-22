import { flushSync } from 'react-dom';

/**
 * View Transitions API: можно ли анимировать смену UI без нарушения a11y.
 */
export function canUseViewTransition() {
  if (typeof document === 'undefined') return false;
  if (typeof document.startViewTransition !== 'function') return false;
  if (typeof window === 'undefined' || !window.matchMedia) return true;
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Обновление DOM/React внутри document.startViewTransition + flushSync,
 * как в BottomNav: снимок View Transition совпадает с committed React-деревом.
 */
export function withViewTransition(updateFn) {
  const run = () => {
    flushSync(updateFn);
  };
  if (canUseViewTransition()) {
    document.startViewTransition(run);
  } else {
    run();
  }
}
