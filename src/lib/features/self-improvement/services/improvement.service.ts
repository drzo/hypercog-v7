import type { ImprovementAction, ImprovementResult } from '../types/improvement';
import { stateService } from './state.service';
import { systemAnalyzer } from '../analysis';
import { logger } from '../utils/logger';
import { analytics } from '../utils/analytics';

export class ImprovementService {
  async evaluateSystem(): Promise<ImprovementResult> {
    try {
      await logger.info('improvement-service', 'Starting system evaluation');

      const [currentState, previousState] = await Promise.all([
        stateService.getCurrentState(),
        stateService.getPreviousState()
      ]);

      // Log current system metrics
      await logger.debug('improvement-service', 'Current system state', {
        metrics: currentState.metrics,
        config: currentState.config
      });

      // Analyze error patterns before improvements
      const errorPatterns = await analytics.getErrorPatterns();
      await logger.info('improvement-service', 'Current error patterns', { errorPatterns });

      // Get component stats
      const componentStats = await analytics.getComponentStats();
      await logger.info('improvement-service', 'Component statistics', { componentStats });

      // Identify improvements
      const improvements = await systemAnalyzer.analyze(currentState, previousState);

      // Log improvement suggestions
      await logger.info('improvement-service', 'Identified improvements', { 
        count: improvements.length,
        improvements: improvements.map(imp => ({
          type: imp.type,
          description: imp.description,
          priority: imp.priority
        }))
      });

      const result = {
        currentState,
        previousState,
        improvements,
        timestamp: new Date().toISOString()
      };

      await logger.info('improvement-service', 'System evaluation completed');

      return result;
    } catch (error) {
      await logger.error('improvement-service', 'System evaluation failed', error);
      throw error;
    }
  }
}

export const improvementService = new ImprovementService();