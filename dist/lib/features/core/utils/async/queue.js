import { logger } from '../../services/logger.service';
export class AsyncQueue {
    queue = [];
    running = false;
    concurrency;
    activeCount = 0;
    constructor(options = {}) {
        this.concurrency = options.concurrency || Infinity;
    }
    async add(task) {
        return new Promise((resolve, reject) => {
            this.queue.push(async () => {
                try {
                    const result = await task();
                    resolve(result);
                }
                catch (error) {
                    logger.error('Queue task failed', { error });
                    reject(error);
                }
            });
            if (!this.running) {
                this.process();
            }
        });
    }
    async next() {
        if (this.queue.length === 0)
            return null;
        const task = this.queue.shift();
        return task ? task() : null;
    }
    async process() {
        if (this.running)
            return;
        this.running = true;
        const activeTasks = [];
        while (this.queue.length > 0 || activeTasks.length > 0) {
            while (this.activeCount < this.concurrency &&
                this.queue.length > 0) {
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
    clear() {
        this.queue = [];
    }
    get size() {
        return this.queue.length;
    }
    get isRunning() {
        return this.running;
    }
    get activeTaskCount() {
        return this.activeCount;
    }
}
