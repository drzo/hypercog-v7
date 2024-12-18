import type { ImprovementResult, Note2Self } from '../../types';
import { createSystemAnalyzer } from './analyzer';
import { createStateService } from '../state/service';
import { loggerService } from '../logger.service';
import type { Env } from '../../types';

export class ImprovementService {
  private readonly analyzer;
  private readonly stateService;

  constructor(env: Env) {
    this.analyzer = createSystemAnalyzer();
    this.stateService = createStateService(env);
  }

  async evaluateSystem(latestNote?: Note2Self): Promise<ImprovementResult> {
    try {
      loggerService.info('Starting system evaluation', {
        hasNote: !!latestNote,
        noteType: latestNote?.type,
        goals: latestNote?.goals?.length
      });

      // Get current and previous states in parallel
      const [currentState, previousState] = await Promise.all([
        this.stateService.getCurrentState(),
        this.stateService.getPreviousState()
      ]);

      // Analyze system and generate improvements
      const improvements = await this.analyzer.analyze(
        currentState,
        previousState,
        latestNote
      );

      const result = {
        currentState,
        previousState,
        improvements,
        timestamp: new Date().toISOString()
      };

      loggerService.info('System evaluation completed', {
        improvementCount: improvements.length,
        metrics: {
          current: currentState.metrics,
          previous: previousState?.metrics
        },
        goals: latestNote?.goals?.map(g => ({
          type: g.type,
          priority: g.priority
        }))
      });

      return result;
    } catch (error) {
      loggerService.error('System evaluation failed', error);
      throw error;
    }
  }
}

export function createImprovementService(env: Env): ImprovementService {
  return new ImprovementService(env);
}