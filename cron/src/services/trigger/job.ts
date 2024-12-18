import type { Job } from '@trigger.dev/sdk';
import { improvementCycle } from './improvement-cycle';

export const jobs: Job[] = [
  {
    id: "hypercog-improvement-cycle",
    name: "HyperCog Self-Improvement Cycle",
    version: "1.0.0",
    trigger: { type: "cron", cron: "*/5 * * * *" },
    run: improvementCycle
  }
];