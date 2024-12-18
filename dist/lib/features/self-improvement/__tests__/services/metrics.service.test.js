import { describe, it, expect, vi, beforeEach } from 'vitest';
import { metricsService } from '../../services/metrics.service';
import { loggerService } from '$lib/features/core/services';
vi.mock('$lib/features/core/services');
describe('MetricsService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });
    it('should collect all metrics', async () => {
        const metrics = await metricsService.collectMetrics();
        expect(metrics).toEqual({
            memoryUsage: expect.any(Object),
            uptime: expect.any(Number),
            responseTime: expect.any(Number),
            errorRate: expect.any(Number),
            throughput: expect.any(Number)
        });
    });
    it('should handle errors during metrics collection', async () => {
        const error = new Error('Test error');
        vi.spyOn(process, 'memoryUsage').mockImplementation(() => {
            throw error;
        });
        await expect(metricsService.collectMetrics()).rejects.toThrow(error);
        expect(loggerService.error).toHaveBeenCalledWith('Failed to collect metrics', error);
    });
});
