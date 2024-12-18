import { OpenAIStrategy } from './openai';
import { AnthropicStrategy } from './anthropic';
export function createLLMStrategy(type = 'openai') {
    switch (type) {
        case 'anthropic':
            return new AnthropicStrategy();
        default:
            return new OpenAIStrategy();
    }
}
