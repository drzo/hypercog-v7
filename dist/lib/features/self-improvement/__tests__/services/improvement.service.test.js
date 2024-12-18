import { describe, it, expect, vi, beforeEach } from 'vitest';
import { improvementService } from '../../services/improvement.service';
import { stateService } from '../../services/state.service';
import { systemAnalyzer } from '../../analysis';
import { logger } from '../../utils/logger';
import { analytics } from '../../utils/analytics';
vi.mock('../../services/state.service');
vi.mock('../../analysis');
vi.mock('../../utils/logger');
vi.mock('../../utils/analytics');
describe('ImprovementService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });
    it('should evaluate system and return improvement result', async () => {
        const mockCurrentState = {
            metrics: {
                memoryUsage: { heapUsed: 100, heapTotal: 1000 },
                uptime: 3600,
                responseTime: 100,
                errorRate: 0.01,
                throughput: 1000
            },
            config: {
                version: '1.0.0',
                environment: 'development',
                features: ['feature1'],
                settings: {}
            },
            timestamp: new Date().toISOString()
        };
        const mockPreviousState = { ...mockCurrentState };
        const mockImprovements = [{
                id: '123',
                type: 'code',
                description: 'Test improvement',
                priority: 5,
                estimatedImpact: 7,
                changes: []
            }];
        vi.mocked(stateService.getCurrentState).mockResolvedValue(mockCurrentState);
        vi.mocked(stateService.getPreviousState).mockResolvedValue(mockPreviousState);
        vi.mocked(systemAnalyzer.analyze).mockResolvedValue(mockImprovements);
        vi.mocked(analytics.getErrorPatterns).mockResolvedValue([]);
        vi.mocked(analytics.getComponentStats).mockResolvedValue({});
        const result = await improvementService.evaluateSystem();
        expect(result).toEqual({
            currentState: mockCurrentState,
            previousState: mockPreviousState,
            improvements: mockImprovements,
            timestamp: expect.any(String)
        });
        expect(logger.info).toHaveBeenCalledWith('improvement-service', 'Starting system evaluation');
    });
    it('should handle errors during evaluation', async () => {
        const error = new Error('Test error');
        vi.mocked(stateService.getCurrentState).mockRejectedValue(error);
        await expect(improvementService.evaluateSystem()).rejects.toThrow(error);
        expect(logger.error).toHaveBeenCalledWith('improvement-service', 'System evaluation failed', error);
    });
});
