export type ModalSize = 'sm' | 'md' | 'lg';

export interface ModalConfig {
  size?: ModalSize;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
}

export const DEFAULT_MODAL_CONFIG: Required<ModalConfig> = {
  size: 'md',
  closeOnBackdrop: true,
  closeOnEscape: true,
};
