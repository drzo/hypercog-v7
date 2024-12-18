import type { QueueOptions } from './types';
import { logger } from '../../services/logger.service';

export class AsyncQueue {
  private queue: Array<() => Promise<any>> = [];
  private running = false;
  private concurrency: number;
  private activeCount = 0;

  constructor(options: QueueOptions = {}) {
    this.concurrency = options.concurrency || Infinity;
  }

  async add<T>(task: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          const result = await task();
          resolve(result);
        } catch (error) {
          logger.error('Queue task failed', { error });
          reject(error);
        }
      });

      if (!this.running) {
        this.process();
      }
    });
  }

  async next(): Promise<any> {
    if (this.queue.length === 0) return null;
    const task = this.queue.shift();
    return task ? task() : null;
  }

  private async process(): Promise<void> {
    if (this.running) return;

    this.running = true;
    const activeTasks: Promise<void>[] = [];

    while (this.queue.length > 0 || activeTasks.length > 0) {
      while (
        this.activeCount < this.concurrency && 
        this.queue.length > 0
      ) {
        const task = this.queue.shift();
        if (task) {
          this.activeCount++;
          const taskPromise = task().finally(() => {
            this.activeCount--;
            const index = activeTasks.indexOf(taskPromise);
            if (index > -1) {
              activeTasks.splice(index, 1);
            }
          });
          activeTasks.push(taskPromise);
        }
      }

      if (activeTasks.length > 0) {
        await Promise.race(activeTasks);
      }
    }

    this.running = false;
  }

  clear(): void {
    this.queue = [];
  }

  get size(): number {
    return this.queue.length;
  }

  get isRunning(): boolean {
    return this.running;
  }

  get activeTaskCount(): number {
    return this.activeCount;
  }
}