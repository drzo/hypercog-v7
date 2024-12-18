import { modal } from '../stores/modal.store';
import type { ModalState } from '../types/modal';
import { get } from 'svelte/store';

export function useModal() {
  function open(component: any, props?: Record<string, any>) {
    modal.open(component, props);
  }

  function close() {
    modal.close();
  }

  function getState(): ModalState {
    return get(modal);
  }

  return {
    open,
    close,
    getState
  };
}