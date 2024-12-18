import type { Queue } from "@cloudflare/workers-types";
import { ImprovementAction } from "../types";

interface ImprovementMessage {
  improvement: ImprovementAction;
}

export async function handleImprovementQueue(
  batch: MessageBatch<ImprovementMessage>,
  env: Env
): Promise<void> {
  const { DB } = env;

  for (const message of batch.messages) {
    const { improvement } = message.body;

    try {
      // Update status to processing
      await DB.prepare(
        "UPDATE improvements SET status = 'processing', updated_at = CURRENT_TIMESTAMP WHERE id = ?"
      ).bind(improvement.id).run();

      // TODO: Process improvement
      // This is where we would:
      // 1. Create GitHub PR
      // 2. Run tests
      // 3. Deploy changes
      // 4. Monitor results

      // Update status to completed
      await DB.prepare(
        "UPDATE improvements SET status = 'completed', updated_at = CURRENT_TIMESTAMP WHERE id = ?"
      ).bind(improvement.id).run();

      // Acknowledge message
      message.ack();
    } catch (error) {
      // Update status to failed
      await DB.prepare(
        "UPDATE improvements SET status = 'failed', updated_at = CURRENT_TIMESTAMP WHERE id = ?"
      ).bind(improvement.id).run();

      // Retry message
      message.retry();
    }
  }
}