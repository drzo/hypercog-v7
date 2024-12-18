import { describe, it, expect, vi, beforeEach } from 'vitest';
import { memoryAnalyzer } from '../../../analysis/metrics/memory-analyzer';
import { loggerService } from '$lib/features/core/services';

vi.mock('$lib/features/core/services');

describe('MemoryAnalyzer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should suggest improvements when memory usage is high', async () => {
    const mockState = {
      metrics: {
        memoryUsage: {
          heapUsed: 850,
          heapTotal: 1000
        }
      },
      config: {},
      timestamp: new Date().toISOString()
    };

    const improvements = await memoryAnalyzer.analyze(mockState, null);

    expect(improvements).toHaveLength(1);
    expect(improvements[0]).toEqual({
      id: expect.any(String),
      type: 'code',
      description: 'Optimize memory usage',
      priority: expect.any(Number),
      estimatedImpact: expect.any(Number),
      changes: expect.arrayContaining([
        {
          path: expect.stringContaining('cache.service.ts'),
          before: null,
          after: expect.any(Object)
        }
      ])
    });
  });

  it('should not suggest improvements when memory usage is normal', async () => {
    const mockState = {
      metrics: {
        memoryUsage: {
          heapUsed: 500,
          heapTotal: 1000
        }
      },
      config: {},
      timestamp: new Date().toISOString()
    };

    const improvements = await memoryAnalyzer.analyze(mockState, null);

    expect(improvements).toHaveLength(0);
  });
});