export interface Env {
  HYPERCOG_KV: KVNamespace;
  IMPROVEMENT_QUEUE: Queue;
  DB: D1Database;
  TRIGGER_DEV: string;
  TRIGGER_PAT: string;
  GIT_HUB_API_KEY: string;
  GIT_HUB_REPO_URL: string;
}