import { DefaultStrategy } from './default';
import { AlternativeStrategy } from './alternative';
export function createStrategy(type = 'default') {
    switch (type) {
        case 'alternative':
            return new AlternativeStrategy();
        default:
            return new DefaultStrategy();
    }
}
