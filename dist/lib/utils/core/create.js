import { BaseStore } from './store/base';
export function createStore(options) {
    return new BaseStore(options);
}
