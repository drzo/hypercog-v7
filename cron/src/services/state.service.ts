import type { SystemState, SystemConfig } from '../types';
import { metricsService } from './metrics.service';
import { persistenceService } from './persistence.service';
import { loggerService } from '$lib/features/core/services';

export class StateService {
  async getCurrentState(): Promise<SystemState> {
    try {
      const [metrics, config] = await Promise.all([
        metricsService.collectMetrics(),
        this.getConfiguration()
      ]);

      const state = {
        metrics,
        config,
        timestamp: new Date().toISOString()
      };

      // Persist the state
      await persistenceService.saveState(state);

      return state;
    } catch (error) {
      loggerService.error('Failed to get current state', error);
      throw error;
    }
  }

  async getPreviousState(): Promise<SystemState | null> {
    try {
      return await persistenceService.getLatestState();
    } catch (error) {
      loggerService.error('Failed to get previous state', error);
      return null;
    }
  }

  private async getConfiguration(): Promise<SystemConfig> {
    return {
      version: process.env.npm_package_version || '0.0.0',
      environment: process.env.NODE_ENV || 'development',
      features: [], // TODO: Implement feature detection
      settings: {} // TODO: Implement settings collection
    };
  }
}

export const stateService = new StateService();