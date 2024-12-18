import { AsyncQueue } from './queue';
import type { AsyncOptions } from './types';

export async function parallel<T>(
  tasks: Array<() => Promise<T>>,
  options: AsyncOptions = {}
): Promise<T[]> {
  const { concurrency = Infinity } = options;
  const queue = new AsyncQueue({ concurrency });
  const results: T[] = [];

  const runTask = async (task: () => Promise<T>, index: number) => {
    try {
      const result = await task();
      results[index] = result;
    } catch (error) {
      throw error;
    }
  };

  const taskPromises = tasks.map((task, index) => 
    queue.add(() => runTask(task, index))
  );

  await Promise.all(taskPromises);
  return results;
}

export async function series<T>(
  tasks: Array<() => Promise<T>>,
  options: AsyncOptions = {}
): Promise<T[]> {
  const results: T[] = [];
  const { signal } = options;

  for (const task of tasks) {
    if (signal?.aborted) {
      throw new Error('Series execution aborted');
    }
    results.push(await task());
  }

  return results;
}