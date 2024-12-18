import type { SystemState } from '../../types/state';
import type { ImprovementAction } from '../../types/improvement';
import { loggerService } from '$lib/features/core/services';

export class ConfigAnalyzer {
  analyze(currentState: SystemState, previousState: SystemState | null): ImprovementAction[] {
    const improvements: ImprovementAction[] = [];
    
    try {
      this.analyzeEnvironment(currentState, improvements);
      this.analyzeFeatures(currentState, improvements);
      this.analyzeSettings(currentState, previousState, improvements);

      return improvements;
    } catch (error) {
      loggerService.error('Config analysis failed', error);
      return [];
    }
  }

  private analyzeEnvironment(state: SystemState, improvements: ImprovementAction[]): void {
    if (state.config.environment === 'development' && this.shouldEnableProduction()) {
      improvements.push({
        id: crypto.randomUUID(),
        type: 'config',
        description: 'Enable production mode',
        priority: 9,
        estimatedImpact: 8,
        changes: [
          {
            path: '.env',
            before: { NODE_ENV: 'development' },
            after: { NODE_ENV: 'production' }
          }
        ]
      });
    }
  }

  private analyzeFeatures(state: SystemState, improvements: ImprovementAction[]): void {
    const recommendedFeatures = this.getRecommendedFeatures();
    const missingFeatures = recommendedFeatures.filter(f => !state.config.features.includes(f));

    if (missingFeatures.length > 0) {
      improvements.push({
        id: crypto.randomUUID(),
        type: 'config',
        description: 'Enable recommended features',
        priority: 6,
        estimatedImpact: 6,
        changes: [
          {
            path: 'src/lib/config/features.ts',
            before: { features: state.config.features },
            after: { features: [...state.config.features, ...missingFeatures] }
          }
        ]
      });
    }
  }

  private analyzeSettings(
    currentState: SystemState,
    previousState: SystemState | null,
    improvements: ImprovementAction[]
  ): void {
    if (previousState) {
      const settingsDiff = this.compareSettings(currentState.config.settings, previousState.config.settings);
      if (Object.keys(settingsDiff).length > 0) {
        improvements.push({
          id: crypto.randomUUID(),
          type: 'config',
          description: 'Optimize configuration settings',
          priority: 5,
          estimatedImpact: 5,
          changes: [
            {
              path: 'src/lib/config/settings.ts',
              before: previousState.config.settings,
              after: { ...previousState.config.settings, ...settingsDiff }
            }
          ]
        });
      }
    }
  }

  private shouldEnableProduction(): boolean {
    // TODO: Implement production readiness check
    return false;
  }

  private getRecommendedFeatures(): string[] {
    return [
      'caching',
      'compression',
      'rateLimit',
      'errorTracking'
    ];
  }

  private compareSettings(current: Record<string, any>, previous: Record<string, any>): Record<string, any> {
    const diff: Record<string, any> = {};
    
    for (const [key, value] of Object.entries(current)) {
      if (previous[key] !== value) {
        diff[key] = value;
      }
    }
    
    return diff;
  }
}

export const configAnalyzer = new ConfigAnalyzer();