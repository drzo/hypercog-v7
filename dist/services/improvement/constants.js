export const IMPROVEMENT_THRESHOLDS = {
    MEMORY: {
        MAX_HEAP_USAGE_INCREASE: 0.1, // 10% increase
        MIN_HEAP_USAGE_DECREASE: 0.05 // 5% decrease
    },
    PERFORMANCE: {
        MAX_RESPONSE_TIME_INCREASE: 0.1, // 10% increase
        MIN_RESPONSE_TIME_DECREASE: 0.05, // 5% decrease
        MAX_ERROR_RATE_INCREASE: 0.01, // 1% increase
        MIN_ERROR_RATE_DECREASE: 0.005, // 0.5% decrease
        MAX_THROUGHPUT_DECREASE: 0.1, // 10% decrease
        MIN_THROUGHPUT_INCREASE: 0.05 // 5% increase
    }
};
