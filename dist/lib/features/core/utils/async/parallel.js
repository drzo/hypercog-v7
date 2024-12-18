import { AsyncQueue } from './queue';
export async function parallel(tasks, options = {}) {
    const { concurrency = Infinity } = options;
    const queue = new AsyncQueue({ concurrency });
    const results = [];
    const runTask = async (task, index) => {
        try {
            const result = await task();
            results[index] = result;
        }
        catch (error) {
            throw error;
        }
    };
    const taskPromises = tasks.map((task, index) => queue.add(() => runTask(task, index)));
    await Promise.all(taskPromises);
    return results;
}
export async function series(tasks, options = {}) {
    const results = [];
    const { signal } = options;
    for (const task of tasks) {
        if (signal?.aborted) {
            throw new Error('Series execution aborted');
        }
        results.push(await task());
    }
    return results;
}
