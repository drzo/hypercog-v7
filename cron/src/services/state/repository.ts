import type { SystemState } from '../../types';
import type { StateRepository } from './types';
import { loggerService } from '../logger.service';

export class D1StateRepository implements StateRepository {
  constructor(private readonly db: D1Database) {}

  async saveState(state: SystemState): Promise<void> {
    try {
      await this.db.prepare(
        "INSERT INTO system_states (metrics, config, timestamp) VALUES (?, ?, ?)"
      ).bind(
        JSON.stringify(state.metrics),
        JSON.stringify(state.config),
        state.timestamp
      ).run();
      
      loggerService.info('Saved system state');
    } catch (error) {
      loggerService.error('Failed to save state', error);
      throw error;
    }
  }

  async getLatestState(): Promise<SystemState | null> {
    try {
      const state = await this.db.prepare(
        "SELECT * FROM system_states ORDER BY timestamp DESC LIMIT 1"
      ).first();

      return state ? this.mapToSystemState(state) : null;
    } catch (error) {
      loggerService.error('Failed to get latest state', error);
      throw error;
    }
  }

  async getStateHistory(): Promise<SystemState[]> {
    try {
      const states = await this.db.prepare(
        "SELECT * FROM system_states ORDER BY timestamp DESC LIMIT 100"
      ).all();

      return states.results.map(this.mapToSystemState);
    } catch (error) {
      loggerService.error('Failed to get state history', error);
      throw error;
    }
  }

  private mapToSystemState(row: any): SystemState {
    return {
      metrics: JSON.parse(row.metrics),
      config: JSON.parse(row.config),
      timestamp: row.timestamp
    };
  }
}