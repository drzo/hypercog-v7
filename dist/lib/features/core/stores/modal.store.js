import { writable } from 'svelte/store';
import { loggerService } from '../services/logger.service';
function createModalStore() {
    const { subscribe, set, update } = writable({
        isOpen: false,
        component: undefined,
        props: undefined
    });
    return {
        subscribe,
        open: (component, props) => {
            update(state => ({
                ...state,
                isOpen: true,
                component,
                props
            }));
            loggerService.info('Modal opened', { component: component.name });
        },
        close: () => {
            set({
                isOpen: false,
                component: undefined,
                props: undefined
            });
            loggerService.info('Modal closed');
        }
    };
}
export const modal = createModalStore();
