import { loggerService } from '../../../logger.service';
export class ImprovementStrategy {
    async analyze(currentState, previousState) {
        try {
            loggerService.info(`Analyzing system with ${this.name} strategy`);
            return await this.doAnalyze(currentState, previousState);
        }
        catch (error) {
            loggerService.error(`Strategy ${this.name} analysis failed`, error);
            throw error;
        }
    }
}
