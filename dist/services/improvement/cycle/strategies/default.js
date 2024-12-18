import { ImprovementStrategy } from './base';
import { systemAnalyzer } from '../../analysis';
export class DefaultStrategy extends ImprovementStrategy {
    name = 'default';
    async doAnalyze(currentState, previousState) {
        return systemAnalyzer.analyze(currentState, previousState);
    }
}
