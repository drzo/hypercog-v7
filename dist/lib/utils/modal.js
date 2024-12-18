import { modal } from '$lib/stores/modal';
import ConfirmModal from '$lib/components/modal/ConfirmModal.svelte';
export function showConfirmDialog(options) {
    return new Promise((resolve) => {
        modal.open(ConfirmModal, {
            ...options,
            onConfirm: () => {
                modal.close();
                resolve(true);
            },
            onCancel: () => {
                modal.close();
                resolve(false);
            }
        });
    });
}
