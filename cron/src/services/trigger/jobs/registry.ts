import type { Job, JobRegistry } from './types';
import { improvementJob } from './improvement';
import type { Env } from '../../../types';

export class JobRegistryImpl implements JobRegistry {
  private readonly jobs: Job[];
  private readonly env: Env;

  constructor(env: Env) {
    this.env = env;
    this.jobs = [
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
  }

  getJobs(): Job[] {
    return this.jobs;
  }

  getEnv(): Env {
    return this.env;
  }
}

export function createJobRegistry(env: Env): JobRegistry {
  return new JobRegistryImpl(env);
}