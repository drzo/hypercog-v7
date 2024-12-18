import { logger } from '../logger/logger';
import type { PerformanceMetrics } from './metrics';

export interface PerformanceThresholds {
  duration?: number;
  heapUsage?: number;
}

export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: PerformanceMetrics[] = [];
  private thresholds: PerformanceThresholds = {};
  private maxMetrics = 100;

  private constructor() {}

  static getInstance(): PerformanceMonitor {
    if (!this.instance) {
      this.instance = new PerformanceMonitor();
    }
    return this.instance;
  }

  setThresholds(thresholds: PerformanceThresholds): void {
    this.thresholds = thresholds;
  }

  addMetrics(metrics: PerformanceMetrics): void {
    this.metrics.push(metrics);
    if (this.metrics.length > this.maxMetrics) {
      this.metrics.shift();
    }

    this.checkThresholds(metrics);
  }

  getMetrics(): PerformanceMetrics[] {
    return [...this.metrics];
  }

  private checkThresholds(metrics: PerformanceMetrics): void {
    if (this.thresholds.duration && metrics.duration > this.thresholds.duration) {
      logger.warn('Performance threshold exceeded: Duration', {
        threshold: this.thresholds.duration,
        actual: metrics.duration
      });
    }

    if (
      this.thresholds.heapUsage &&
      metrics.memory &&
      metrics.memory.usedJSHeapSize > this.thresholds.heapUsage
    ) {
      logger.warn('Performance threshold exceeded: Heap Usage', {
        threshold: this.thresholds.heapUsage,
        actual: metrics.memory.usedJSHeapSize
      });
    }
  }
}