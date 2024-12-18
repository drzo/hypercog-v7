import { AsyncQueue } from './queue';
import { logger } from '../../services/logger.service';
export class BatchProcessor {
    queue;
    maxBatchSize;
    maxWaitTime;
    processingFn;
    currentBatch = [];
    batchTimer = null;
    constructor(processingFn, options) {
        this.queue = new AsyncQueue({ concurrency: options.concurrency });
        this.maxBatchSize = options.maxBatchSize;
        this.maxWaitTime = options.maxWaitTime;
        this.processingFn = processingFn;
    }
    async add(item, options = {}) {
        await this.queue.add(async () => {
            this.currentBatch.push(item);
            if (this.currentBatch.length >= this.maxBatchSize) {
                await this.processBatch();
            }
            else if (!this.batchTimer) {
                this.batchTimer = setTimeout(() => this.processBatch(), this.maxWaitTime);
            }
            if (options.signal) {
                options.signal.addEventListener('abort', () => {
                    this.clearBatchTimer();
                    throw new Error('Batch processing aborted');
                });
            }
        });
    }
    async processBatch() {
        this.clearBatchTimer();
        if (this.currentBatch.length === 0)
            return;
        const batchToProcess = [...this.currentBatch];
        this.currentBatch = [];
        try {
            await this.processingFn(batchToProcess);
            logger.info('Batch processed successfully', {
                batchSize: batchToProcess.length
            });
        }
        catch (error) {
            logger.error('Batch processing failed', {
                error,
                batchSize: batchToProcess.length
            });
            throw error;
        }
    }
    clearBatchTimer() {
        if (this.batchTimer) {
            clearTimeout(this.batchTimer);
            this.batchTimer = null;
        }
    }
    async flush() {
        await this.processBatch();
    }
}
