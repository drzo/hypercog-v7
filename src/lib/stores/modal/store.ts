import { writable } from 'svelte/store';
import type { ComponentType } from 'svelte';
import type { ModalState, ModalStore } from './types';

const initialState: ModalState = {
  isOpen: false,
  component: undefined,
  props: undefined
};

function createModalStore(): ModalStore {
  const { subscribe, set, update } = writable<ModalState>(initialState);

  return {
    subscribe,
    open: (component: ComponentType, props?: Record<string, any>) => {
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