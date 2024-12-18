export interface ModalState {
  isOpen: boolean;
  component?: any;
  props?: Record<string, any>;
}

export interface ModalOptions {
  closeOnEscape?: boolean;
  closeOnOutsideClick?: boolean;
  onClose?: () => void;
}