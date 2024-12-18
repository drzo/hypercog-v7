import type { SystemState } from '../../types';

export interface StateRepository {
  saveState(state: SystemState): Promise<void>;
  getLatestState(): Promise<SystemState | null>;
  getStateHistory(): Promise<SystemState[]>;
}

export interface StateService {
  getCurrentState(): Promise<SystemState>;
  getPreviousState(): Promise<SystemState | null>;
}