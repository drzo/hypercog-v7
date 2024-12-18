import { DateTime, Str } from "chanfana";
import { z } from "zod";

export const SystemState = z.object({
  metrics: z.object({
    memoryUsage: z.object({
      heapUsed: z.number(),
      heapTotal: z.number(),
      external: z.number(),
      rss: z.number()
    }),
    uptime: z.number(),
    responseTime: z.number(),
    errorRate: z.number(),
    throughput: z.number()
  }),
  config: z.object({
    version: Str(),
    environment: Str(),
    features: z.array(Str()),
    settings: z.record(z.any())
  }),
  timestamp: DateTime()
});

export const ImprovementAction = z.object({
  id: Str(),
  type: z.enum(['code', 'config', 'dependency', 'rollback']),
  description: Str(),
  priority: z.number(),
  estimatedImpact: z.number(),
  changes: z.array(z.object({
    path: Str(),
    before: z.any(),
    after: z.any()
  }))
});

export const Note = z.object({
  id: Str(),
  timestamp: DateTime(),
  type: z.enum(['improvement', 'degradation', 'failure']),
  description: Str(),
  changes: z.array(z.object({
    component: Str(),
    before: z.any(),
    after: z.any()
  })),
  metrics: z.object({
    before: z.record(z.number()),
    after: z.record(z.number())
  }).optional(),
  goals: z.array(z.object({
    type: z.enum(['improvement', 'diagnostics', 'rollback']),
    description: Str(),
    priority: z.number()
  })).optional()
});