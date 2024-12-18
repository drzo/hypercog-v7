import type { ComponentType } from 'svelte';

export interface ModalProps {
  onClose?: () => void;
  closeOnEscape?: boolean;
  closeOnOutsideClick?: boolean;
}

export interface ModalState {
  isOpen: boolean;
  component?: ComponentType;
  props?: Record<string, any>;
}