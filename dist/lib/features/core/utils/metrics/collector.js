import { logger } from '../logger';
class MetricsCollector {
    marks = new Map();
    mark(name) {
        this.marks.set(name, performance.now());
    }
    measure(startMark, endMark) {
        const start = this.marks.get(startMark);
        const end = this.marks.get(endMark);
        if (!start || !end)
            return null;
        return end - start;
    }
    clearMarks() {
        this.marks.clear();
    }
    async collectMetrics() {
        try {
            const metrics = {
                timestamp: Date.now(),
                duration: performance.now(),
                marks: Object.fromEntries(this.marks)
            };
            if (performance.memory) {
                metrics.memory = {
                    usedJSHeapSize: performance.memory.usedJSHeapSize,
                    totalJSHeapSize: performance.memory.totalJSHeapSize,
                    heapLimit: performance.memory.jsHeapSizeLimit
                };
            }
            return metrics;
        }
        catch (error) {
            logger.error('Failed to collect metrics', error);
            throw error;
        }
    }
}
// Export singleton instance
export const metrics = new MetricsCollector();
