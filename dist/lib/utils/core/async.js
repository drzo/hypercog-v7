import { AsyncQueue } from './async/queue';
import { retry } from './async/retry';
import { withTimeout } from './async/timeout';
export const async = {
    queue: new AsyncQueue(),
    retry,
    withTimeout,
    parallel: async (tasks, concurrency = Infinity) => {
        const results = [];
        const queue = new AsyncQueue();
        const runTask = async (task, index) => {
            const result = await task();
            results[index] = result;
        };
        const taskPromises = tasks.map((task, index) => queue.add(() => runTask(task, index)));
        await Promise.all(taskPromises);
        return results;
    },
    series: async (tasks) => {
        const results = [];
        for (const task of tasks) {
            results.push(await task());
        }
        return results;
    }
};
