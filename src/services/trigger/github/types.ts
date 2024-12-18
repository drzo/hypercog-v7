export interface GitHubConfig {
  owner: string;
  repo: string;
  branch: string;
  apiKey: string;
}

export interface WorkflowConfig {
  name: string;
  schedule: string;
  env: Record<string, string>;
  steps: WorkflowStep[];
}

export interface WorkflowStep {
  name: string;
  run?: string;
  uses?: string;
  with?: Record<string, string>;
}