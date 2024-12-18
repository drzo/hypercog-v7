export * from './types';
export * from './queue';
export * from './retry';
export * from './timeout';

// Utility functions
export async function parallel<T>(
  tasks: Array<() => Promise<T>>,
  concurrency: number = Infinity
): Promise<T[]> {
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
}

export async function series<T>(
  tasks: Array<() => Promise<T>>
): Promise<T[]> {
  const results: T[] = [];
  for (const task of tasks) {
    results.push(await task());
  }
  return results;
}