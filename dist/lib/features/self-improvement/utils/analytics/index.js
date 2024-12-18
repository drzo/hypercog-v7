import { errorAnalyzer } from './error-analyzer';
import { componentAnalyzer } from './component-analyzer';
export class Analytics {
    getErrorRate = errorAnalyzer.getErrorRate.bind(errorAnalyzer);
    getErrorPatterns = errorAnalyzer.getErrorPatterns.bind(errorAnalyzer);
    getComponentStats = componentAnalyzer.getComponentStats.bind(componentAnalyzer);
}
export const analytics = new Analytics();
