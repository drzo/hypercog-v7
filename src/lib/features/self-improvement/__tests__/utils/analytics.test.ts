import { describe, it, expect, vi, beforeEach } from 'vitest';
import { analytics } from '../../utils/analytics';
import { logger } from '../../utils/logger';

vi.mock('../../utils/logger');

describe('Analytics', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should calculate error rate', async () => {
    const mockLogs = [
      { level: 'error' },
      { level: 'info' },
      { level: 'error' },
      { level: 'debug' }
    ];

    vi.mocked(logger.getLogs).mockResolvedValue(mockLogs as any);

    const errorRate = await analytics.getErrorRate();

    expect(errorRate).toBe(0.5); // 2 errors out of 4 logs
  });

  it('should return 0 error rate when no logs', async () => {
    vi.mocked(logger.getLogs).mockResolvedValue([]);

    const errorRate = await analytics.getErrorRate();

    expect(errorRate).toBe(0);
  });

  it('should get component stats', async () => {
    const mockLogs = [
      { component: 'A', level: 'error' },
      { component: 'A', level: 'warn' },
      { component: 'B', level: 'info' },
      { component: 'A', level: 'error' }
    ];

    vi.mocked(logger.getLogs).mockResolvedValue(mockLogs as any);

    const stats = await analytics.getComponentStats();

    expect(stats).toEqual({
      A: { total: 3, errors: 2, warnings: 1 },
      B: { total: 1, errors: 0, warnings: 0 }
    });
  });

  it('should get error patterns', async () => {
    const mockLogs = [
      {
        error: { name: 'Error', message: 'test error' },
        level: 'error'
      },
      {
        error: { name: 'Error', message: 'test error' },
        level: 'error'
      },
      {
        error: { name: 'TypeError', message: 'different error' },
        level: 'error'
      }
    ];

    vi.mocked(logger.getLogs).mockResolvedValue(mockLogs as any);

    const patterns = await analytics.getErrorPatterns();

    expect(patterns).toEqual([
      {
        pattern: 'Error: test error',
        count: 2,
        examples: expect.any(Array)
      },
      {
        pattern: 'TypeError: different error',
        count: 1,
        examples: expect.any(Array)
      }
    ]);
  });
});