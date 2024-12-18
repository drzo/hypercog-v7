import { writable } from 'svelte/store';
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
        },
        close: () => {
            set({
                isOpen: false,
                component: undefined,
                props: undefined
            });
        }
    };
}
export const modal = createModalStore();
