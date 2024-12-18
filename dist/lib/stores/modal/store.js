import { writable } from 'svelte/store';
const initialState = {
    isOpen: false,
    component: undefined,
    props: undefined
};
function createModalStore() {
    const { subscribe, set, update } = writable(initialState);
    return {
        subscribe,
        open: (component, props) => {
            update(() => ({
                isOpen: true,
                component,
                props
            }));
        },
        close: () => set(initialState)
    };
}
export const modal = createModalStore();
