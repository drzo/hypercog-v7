import { modal } from '../stores/modal.store';
import { get } from 'svelte/store';
export function useModal() {
    function open(component, props) {
        modal.open(component, props);
    }
    function close() {
        modal.close();
    }
    function getState() {
        return get(modal);
    }
    return {
        open,
        close,
        getState
    };
}
