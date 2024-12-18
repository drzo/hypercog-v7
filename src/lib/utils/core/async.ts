import { AsyncQueue } from './async/queue';
import { retry } from './async/retry';
import { withTimeout } from './async/timeout';
import type { AsyncOptions } from './async/types';

export const async = {
  queue: new AsyncQueue(),
  retry,
  withTimeout,
  
  parallel: async <T>(
    tasks: Array<() => Promise<T>>,
    concurrency: number = Infinity
  ): Promise<T[]> => {
    const results: T[] = [];
    const queue = new AsyncQueue();

    const runTask = async (task: () => Promise<T>, index: number) => {
      const result = await task();
      results[index] = result;
    };

    const taskPromises = tasks.map((task, index) => 
      queue.add(() => runTask(task, index))
    );

    await Promise.all(taskPromises);
    return results;
  },

  series: async <T>(tasks: Array<() => Promise<T>>): Promise<T[]> => {
    const results: T[] = [];
    for (const task of tasks) {
      results.push(await task());
    }
    return results;
  }
};