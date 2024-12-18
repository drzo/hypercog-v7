export interface CycleResult {
  cycleId: string;
  startTime: number;
  endTime?: number;
  success: boolean;
  metrics?: Record<string, number>;
  error?: Error;
}

export interface CycleMonitor {
  startCycle(cycleId: string): void;
  completeCycle(cycleId: string, metrics: Record<string, number>): void;
  failCycle(cycleId: string, error: Error): void;
  getResults(): CycleResult[];
}