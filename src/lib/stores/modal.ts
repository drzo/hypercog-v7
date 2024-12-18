import { writable } from 'svelte/store';
import type { ComponentType } from 'svelte';

interface ModalState {
  isOpen: boolean;
  component?: ComponentType;
  props?: Record<string, any>;
}

function createModalStore() {
  const { subscribe, set, update } = writable<ModalState>({
    isOpen: false,
    component: undefined,
    props: undefined
  });

  return {
    subscribe,
    open: (component: ComponentType, props?: Record<string, any>) => {
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