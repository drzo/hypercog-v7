import { Bool, OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { SystemState } from "../../types";

export class GetCurrentState extends OpenAPIRoute {
  schema = {
    tags: ["System State"],
    summary: "Get current system state",
    responses: {
      "200": {
        description: "Returns the current system state",
        content: {
          "application/json": {
            schema: z.object({
              success: Bool(),
              result: SystemState
            })
          }
        }
      }
    }
  };

  async handle(c) {
    const { DB } = c.env;
    
    try {
      const state = await DB.prepare(
        "SELECT * FROM system_states ORDER BY timestamp DESC LIMIT 1"
      ).first();

      return {
        success: true,
        result: state
      };
    } catch (error) {
      return new Response(JSON.stringify({
        success: false,
        error: error.message
      }), { status: 500 });
    }
  }
}