import { logger } from '../logger';
export class PerformanceMonitor {
    static instance;
    metrics = [];
    thresholds = {};
    maxMetrics = 100;
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new PerformanceMonitor();
        }
        return this.instance;
    }
    setThresholds(thresholds) {
        this.thresholds = thresholds;
    }
    addMetrics(metrics) {
        this.metrics.push(metrics);
        if (this.metrics.length > this.maxMetrics) {
            this.metrics.shift();
        }
        this.checkThresholds(metrics);
    }
    getMetrics() {
        return [...this.metrics];
    }
    checkThresholds(metrics) {
        if (this.thresholds.duration && metrics.duration > this.thresholds.duration) {
            logger.warn('Performance threshold exceeded: Duration', {
                threshold: this.thresholds.duration,
                actual: metrics.duration
            });
        }
        if (this.thresholds.heapUsage &&
            metrics.memory &&
            metrics.memory.usedJSHeapSize > this.thresholds.heapUsage) {
            logger.warn('Performance threshold exceeded: Heap Usage', {
                threshold: this.thresholds.heapUsage,
                actual: metrics.memory.usedJSHeapSize
            });
        }
    }
}
