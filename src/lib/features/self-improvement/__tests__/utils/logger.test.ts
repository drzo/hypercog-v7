import { describe, it, expect, vi, beforeEach } from 'vitest';
import { logger } from '../../utils/logger';
import { logStorage } from '../../utils/logger/storage';
import { loggerService } from '$lib/features/core/services';

vi.mock('../../utils/logger/storage');
vi.mock('$lib/features/core/services');

describe('Logger', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should log messages with correct format', async () => {
    const component = 'test';
    const message = 'test message';
    const data = { foo: 'bar' };

    await logger.info(component, message, data);

    expect(logStorage.store).toHaveBeenCalledWith({
      id: expect.any(String),
      timestamp: expect.any(String),
      level: 'info',
      component,
      message,
      data
    });

    expect(loggerService.info).toHaveBeenCalledWith(
      message,
      { ...data, component }
    );
  });

  it('should log errors with stack trace', async () => {
    const component = 'test';
    const message = 'error message';
    const error = new Error(message);
    const data = { foo: 'bar' };

    await logger.error(component, message, error, data);

    expect(logStorage.store).toHaveBeenCalledWith({
      id: expect.any(String),
      timestamp: expect.any(String),
      level: 'error',
      component,
      message,
      data,
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack
      }
    });
  });

  it('should filter logs by options', async () => {
    const mockLogs = [
      { level: 'error', component: 'A', timestamp: '2023-01-01' },
      { level: 'info', component: 'B', timestamp: '2023-01-02' },
      { level: 'error', component: 'A', timestamp: '2023-01-03' }
    ];

    vi.mocked(logStorage.load).mockResolvedValue(mockLogs as any);

    const logs = await logger.getLogs({
      level: 'error',
      component: 'A',
      since: new Date('2023-01-02')
    });

    expect(logs).toHaveLength(1);
    expect(logs[0]).toEqual(mockLogs[2]);
  });
});