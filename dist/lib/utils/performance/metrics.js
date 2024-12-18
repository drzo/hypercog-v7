export class PerformanceMetrics {
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
    static getMetrics() {
        const metrics = {
            timestamp: Date.now(),
            duration: performance.now(),
            marks: Object.fromEntries(this.marks)
        };
        if (performance.memory) {
            metrics.memory = {
                usedJSHeapSize: performance.memory.usedJSHeapSize,
                totalJSHeapSize: performance.memory.totalJSHeapSize
            };
        }
        return metrics;
    }
}
