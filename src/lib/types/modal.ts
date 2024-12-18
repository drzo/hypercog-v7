export interface ModalState {
  isOpen: boolean;
  component?: any;
  props?: Record<string, any>;
}

export interface ModalOptions {
  onClose?: () => void;
  closeOnEscape?: boolean;
  closeOnOutsideClick?: boolean;
}