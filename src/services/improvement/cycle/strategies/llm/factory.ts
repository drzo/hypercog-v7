import { OpenAIStrategy } from './openai';
import { AnthropicStrategy } from './anthropic';
import type { LLMStrategy } from './base';

export function createLLMStrategy(type: string = 'openai'): LLMStrategy {
  switch (type) {
    case 'anthropic':
      return new AnthropicStrategy();
    default:
      return new OpenAIStrategy();
  }
}