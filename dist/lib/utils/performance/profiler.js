export class Profiler {
    static activeProfiles = new Map();
    static start(options) {
        const { name } = options;
        this.activeProfiles.set(name, performance.now());
    }
    static end(options) {
        const { name, logResults = true } = options;
        const startTime = this.activeProfiles.get(name);
        if (!startTime) {
            throw new Error(`No active profile found for: ${name}`);
        }
        const duration = performance.now() - startTime;
        this.activeProfiles.delete(name);
        if (logResults) {
            console.log(`Profile ${name}: ${duration.toFixed(2)}ms`);
        }
        return duration;
    }
    static async profile(options, fn) {
        this.start(options);
        try {
            return await fn();
        }
        finally {
            this.end(options);
        }
    }
    static isActive(name) {
        return this.activeProfiles.has(name);
    }
    static clear() {
        this.activeProfiles.clear();
    }
}
