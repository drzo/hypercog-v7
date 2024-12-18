import { LLMStrategy } from './base';
import { loggerService } from '../../../../logger.service';
export class AnthropicStrategy extends LLMStrategy {
    name = 'anthropic';
    apiKey = process.env.ANTHROPIC_API_KEY;
    async getStrategicGuidance(currentState, previousState) {
        try {
            const response = await fetch('https://api.anthropic.com/v1/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': this.apiKey,
                    'anthropic-version': '2023-06-01'
                },
                body: JSON.stringify({
                    model: 'claude-2',
                    messages: [{
                            role: 'user',
                            content: `Current system state:\n${this.formatSystemState(currentState)}\n\nMetrics comparison:\n${this.formatMetricsComparison(currentState, previousState)}\n\nAnalyze the system state and metrics to suggest concrete improvements.`
                        }],
                    max_tokens: 1000
                })
            });
            const data = await response.json();
            const suggestions = this.parseResponse(data.content[0].text);
            loggerService.info('Anthropic strategic guidance received', { suggestions });
            return suggestions;
        }
        catch (error) {
            loggerService.error('Anthropic API request failed', error);
            return [];
        }
    }
    parseResponse(content) {
        try {
            return JSON.parse(content);
        }
        catch {
            loggerService.error('Failed to parse Anthropic response');
            return [];
        }
    }
}
