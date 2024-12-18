import { z } from "zod";
import { SystemState, ImprovementAction, Note } from "../types";

export const DbSystemState = SystemState.extend({
  id: z.number()
});

export const DbImprovement = ImprovementAction.extend({
  status: z.enum(['pending', 'processing', 'completed', 'failed']),
  created_at: z.string(),
  updated_at: z.string()
});

export const DbNote = Note.extend({
  created_at: z.string()
});

export type DbSystemState = z.infer<typeof DbSystemState>;
export type DbImprovement = z.infer<typeof DbImprovement>;
export type DbNote = z.infer<typeof DbNote>;