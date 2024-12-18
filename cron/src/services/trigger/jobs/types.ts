import type { Env } from '../../../types';

export interface JobContext {
  env: Env;
  io: any;
  payload?: any;
}

export interface Job {
  id: string;
  name: string;
  version: string;
  trigger: {
    type: string;
    cron?: string;
  };
  run: (context: JobContext) => Promise<void>;
}

export interface JobRegistry {
  getJobs(): Job[];
  getEnv(): Env;
}