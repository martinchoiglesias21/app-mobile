import { es, type Strings } from './es';

// The only place that picks the language. Components import `strings` from here.
export const strings: Strings = es;

export type { Strings };
