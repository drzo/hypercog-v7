import { describe, it, expect, vi, beforeEach } from 'vitest';
import { systemAnalyzer } from '../../analysis';
import { memoryAnalyzer } from '../../analysis/metrics/memory-analyzer';
import { performanceAnalyzer } from '../../analysis/metrics/performance-analyzer';
import { dependencyAnalyzer } from '../../analysis/dependencies/dependency-analyzer';
import { configAnalyzer } from '../../analysis/config/config-analyzer';
import { loggerService } from '$lib/features/core/services';
vi.mock('../../analysis/metrics/memory-analyzer');
vi.mock('../../analysis/metrics/performance-analyzer');
vi.mock('../../analysis/dependencies/dependency-analyzer');
vi.mock('../../analysis/config/config-analyzer');
vi.mock('$lib/features/core/services');
describe('SystemAnalyzer', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });
    it('should analyze system and return sorted improvements', async () => {
        const mockState = {
            metrics: {},
            config: {},
            timestamp: new Date().toISOString()
        };
        const mockImprovements = [
            { priority: 5, estimatedImpact: 5, type: 'code', description: 'Test 1', changes: [] },
            { priority: 8, estimatedImpact: 7, type: 'config', description: 'Test 2', changes: [] },
            { priority: 3, estimatedImpact: 4, type: 'dependency', description: 'Test 3', changes: [] }
        ];
        vi.mocked(memoryAnalyzer.analyze).mockResolvedValue([mockImprovements[0]]);
        vi.mocked(performanceAnalyzer.analyze).mockResolvedValue([mockImprovements[1]]);
        vi.mocked(dependencyAnalyzer.analyze).mockResolvedValue([mockImprovements[2]]);
        vi.mocked(configAnalyzer.analyze).mockResolvedValue([]);
        const improvements = await systemAnalyzer.analyze(mockState, null);
        expect(improvements).toHaveLength(3);
        // Should be sorted by priority (60%) and estimated impact (40%)
        expect(improvements[0]).toEqual(mockImprovements[1]); // Highest score
        expect(improvements[1]).toEqual(mockImprovements[0]); // Medium score
        expect(improvements[2]).toEqual(mockImprovements[2]); // Lowest score
    });
    it('should handle errors during analysis', async () => {
        const error = new Error('Test error');
        vi.mocked(memoryAnalyzer.analyze).mockRejectedValue(error);
        const mockState = {
            metrics: {},
            config: {},
            timestamp: new Date().toISOString()
        };
        await expect(systemAnalyzer.analyze(mockState, null)).rejects.toThrow(error);
        expect(loggerService.error).toHaveBeenCalledWith('System analysis failed', error);
    });
});
