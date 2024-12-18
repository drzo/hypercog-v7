import type { SystemState, ImprovementAction } from '../../../../../types';

export interface LLMResponse {
  suggestions: ImprovementAction[];
  reasoning: string;
  confidence: number;
}

export interface LLMStrategyOptions {
  temperature?: number;
  maxTokens?: number;
  model?: string;
}

export interface LLMProvider {
  name: string;
  analyze(
    currentState: SystemState,
    previousState: SystemState | null,
    options?: LLMStrategyOptions
  ): Promise<LLMResponse>;
}