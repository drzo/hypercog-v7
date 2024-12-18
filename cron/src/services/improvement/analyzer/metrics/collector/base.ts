import type { SystemState } from '../../../../../types';
import type { MetricsCollector } from './types';
import { loggerService } from '../../../../logger.service';

export abstract class BaseMetricsCollector<T> implements MetricsCollector<T> {
  async collect(state: SystemState): Promise<T> {
    try {
      const metrics = await this.doCollect(state);
      
      loggerService.info(`${this.getMetricType()} metrics collected`, {
        metrics,
        state: {
          timestamp: state.timestamp,
          type: this.getMetricType()
        }
      });

      return metrics;
    } catch (error) {
      loggerService.error(`Failed to collect ${this.getMetricType()} metrics`, error);
      throw error;
    }
  }

  protected abstract doCollect(state: SystemState): Promise<T>;
  protected abstract getMetricType(): string;
}