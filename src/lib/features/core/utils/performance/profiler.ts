import { logger } from '../logger';

export interface ProfilerOptions {
  name: string;
  logResults?: boolean;
}

export class Profiler {
  private static activeProfiles = new Map<string, number>();

  static start(options: ProfilerOptions): void {
    const { name } = options;
    this.activeProfiles.set(name, performance.now());
  }

  static end(options: ProfilerOptions): number {
    const { name, logResults = true } = options;
    const startTime = this.activeProfiles.get(name);

    if (!startTime) {
      throw new Error(`No active profile found for: ${name}`);
    }

    const duration = performance.now() - startTime;
    this.activeProfiles.delete(name);

    if (logResults) {
      logger.info('Profile completed', {
        name,
        duration: `${duration.toFixed(2)}ms`
      });
    }

    return duration;
  }

  static async profile<T>(
    options: ProfilerOptions,
    fn: () => Promise<T>
  ): Promise<T> {
    this.start(options);
    try {
      return await fn();
    } finally {
      this.end(options);
    }
  }

  static isActive(name: string): boolean {
    return this.activeProfiles.has(name);
  }

  static clear(): void {
    this.activeProfiles.clear();
  }
}