import type { ComponentType } from 'svelte';

export interface ModalState {
  isOpen: boolean;
  component?: ComponentType;
  props?: Record<string, any>;
}

export interface ModalStore {
  subscribe: (run: (value: ModalState) => void) => () => void;
  open: (component: ComponentType, props?: Record<string, any>) => void;
  close: () => void;
}

export interface ModalProps {
  closeOnEscape?: boolean;
  closeOnOutsideClick?: boolean;
  onClose?: () => void;
}