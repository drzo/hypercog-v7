export class AsyncQueue {
    queue = [];
    running = false;
    async add(task) {
        return new Promise((resolve, reject) => {
            this.queue.push(async () => {
                try {
                    const result = await task();
                    resolve(result);
                }
                catch (error) {
                    reject(error);
                }
            });
            if (!this.running) {
                this.process();
            }
        });
    }
    async process() {
        if (this.running || this.queue.length === 0)
            return;
        this.running = true;
        while (this.queue.length > 0) {
            const task = this.queue.shift();
            if (task) {
                await task();
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
}
