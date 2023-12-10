import { number } from 'style-value-types';

const int = {
    ...number,
    transform: Math.round,
};

export { int };
