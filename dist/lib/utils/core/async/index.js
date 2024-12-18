export * from './types';
export * from './queue';
export * from './retry';
export * from './timeout';
// Utility functions
export async function parallel(tasks, concurrency = Infinity) {
    const results = [];
    const queue = new AsyncQueue();
    const runTask = async (task, index) => {
        const result = await task();
        results[index] = result;
    };
    const taskPromises = tasks.map((task, index) => queue.add(() => runTask(task, index)));
    await Promise.all(taskPromises);
    return results;
}
export async function series(tasks) {
    const results = [];
    for (const task of tasks) {
        results.push(await task());
    }
    return results;
}
