import { logger } from './utils/logger';
import { performanceMonitor } from './utils/performance';

export async function initializeCore() {
  try {
    logger.info('Initializing core features...');

    // Initialize performance monitoring
    performanceMonitor.setThresholds({
      duration: 1000, // 1 second
      heapUsage: 100 * 1024 * 1024 // 100MB
    });

    logger.info('Core features initialized successfully');
  } catch (error) {
    logger.error('Failed to initialize core features', error);
    throw error;
  }
}