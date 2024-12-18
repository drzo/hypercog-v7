import type { Job } from '../types';
import { improvementJob } from './improvement';

export const jobs: Job[] = [
  {
    id: "hypercog-improvement-cycle",
    name: "HyperCog Self-Improvement Cycle",
    version: "1.0.0",
    trigger: { 
      type: "cron", 
      cron: "*/5 * * * *" // Every 5 minutes
    },
    run: improvementJob
  }
];

export * from './improvement';
export * from './types';