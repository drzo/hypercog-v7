import { logger } from '../logger';
export class MetricsCollector {
    static marks = new Map();
    static mark(name) {
        this.marks.set(name, performance.now());
    }
    static measure(startMark, endMark) {
        const start = this.marks.get(startMark);
        const end = this.marks.get(endMark);
        if (!start || !end)
            return null;
        return end - start;
    }
    static clearMarks() {
        this.marks.clear();
    }
    static async collectMetrics() {
        try {
            const metrics = {
                timestamp: Date.now(),
                duration: performance.now(),
                marks: Object.fromEntries(this.marks)
            };
            // Add memory metrics if available
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
            logger.error('Failed to collect performance metrics', error);
            throw error;
        }
    }
}
// Export static methods directly
export const { mark, measure, clearMarks, collectMetrics } = MetricsCollector;
