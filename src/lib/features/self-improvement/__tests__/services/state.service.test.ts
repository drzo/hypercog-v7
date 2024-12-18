import { describe, it, expect, vi, beforeEach } from 'vitest';
import { stateService } from '../../services/state.service';
import { metricsService } from '../../services/metrics.service';
import { persistenceService } from '../../services/persistence.service';
import { loggerService } from '$lib/features/core/services';

vi.mock('../../services/metrics.service');
vi.mock('../../services/persistence.service');
vi.mock('$lib/features/core/services');

describe('StateService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should get current state', async () => {
    const mockMetrics = {
      memoryUsage: { heapUsed: 100, heapTotal: 1000 },
      uptime: 3600,
      responseTime: 100,
      errorRate: 0.01,
      throughput: 1000
    };

    vi.mocked(metricsService.collectMetrics).mockResolvedValue(mockMetrics);

    const state = await stateService.getCurrentState();

    expect(state).toEqual({
      metrics: mockMetrics,
      config: {
        version: expect.any(String),
        environment: expect.any(String),
        features: expect.any(Array),
        settings: expect.any(Object)
      },
      timestamp: expect.any(String)
    });

    expect(persistenceService.saveState).toHaveBeenCalledWith(state);
  });

  it('should handle errors when getting current state', async () => {
    const error = new Error('Test error');
    vi.mocked(metricsService.collectMetrics).mockRejectedValue(error);

    await expect(stateService.getCurrentState()).rejects.toThrow(error);

    expect(loggerService.error).toHaveBeenCalledWith(
      'Failed to get current state',
      error
    );
  });

  it('should get previous state', async () => {
    const mockState = {
      metrics: {},
      config: {},
      timestamp: new Date().toISOString()
    };

    vi.mocked(persistenceService.getLatestState).mockResolvedValue(mockState);

    const state = await stateService.getPreviousState();

    expect(state).toEqual(mockState);
  });

  it('should handle errors when getting previous state', async () => {
    const error = new Error('Test error');
    vi.mocked(persistenceService.getLatestState).mockRejectedValue(error);

    const state = await stateService.getPreviousState();

    expect(state).toBeNull();
    expect(loggerService.error).toHaveBeenCalledWith(
      'Failed to get previous state',
      error
    );
  });
});