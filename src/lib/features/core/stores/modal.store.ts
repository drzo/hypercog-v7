import { writable } from 'svelte/store';
import type { ModalState } from '../types/modal';
import { loggerService } from '../services/logger.service';

function createModalStore() {
  const { subscribe, set, update } = writable<ModalState>({
    isOpen: false,
    component: undefined,
    props: undefined
  });

  return {
    subscribe,
    open: (component: any, props?: Record<string, any>) => {
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