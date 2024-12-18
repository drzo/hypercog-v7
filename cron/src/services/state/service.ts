import type { SystemState } from '../../types';
import type { StateService } from './types';
import { D1StateRepository } from './repository';
import { createMetricsCollector } from './metrics';
import { createConfigCollector } from './config';
import { loggerService } from '../logger.service';
import type { Env } from '../../types';

export class StateServiceImpl implements StateService {
  private readonly repository;
  private readonly metricsCollector;
  private readonly configCollector;

  constructor(env: Env) {
    this.repository = new D1StateRepository(env.DB);
    this.metricsCollector = createMetricsCollector();
    this.configCollector = createConfigCollector();
  }

  async getCurrentState(): Promise<SystemState> {
    try {
      const [metrics, config] = await Promise.all([
        this.metricsCollector.collectMetrics(),
        this.configCollector.getConfiguration()
      ]);

      const state = {
        metrics,
        config,
        timestamp: new Date().toISOString()
      };

      await this.repository.saveState(state);
      return state;
    } catch (error) {
      loggerService.error('Failed to get current state', error);
      throw error;
    }
  }

  async getPreviousState(): Promise<SystemState | null> {
    try {
      return await this.repository.getLatestState();
    } catch (error) {
      loggerService.error('Failed to get previous state', error);
      return null;
    }
  }
}

export function createStateService(env: Env): StateService {
  return new StateServiceImpl(env);
}