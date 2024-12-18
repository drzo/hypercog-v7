import { Bool, OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { ImprovementAction } from "../../types";

export class CreateImprovement extends OpenAPIRoute {
  schema = {
    tags: ["Improvements"],
    summary: "Create a new improvement action",
    request: {
      body: {
        content: {
          "application/json": {
            schema: ImprovementAction
          }
        }
      }
    },
    responses: {
      "200": {
        description: "Returns the created improvement",
        content: {
          "application/json": {
            schema: z.object({
              success: Bool(),
              result: ImprovementAction
            })
          }
        }
      }
    }
  };

  async handle(c) {
    const { IMPROVEMENT_QUEUE } = c.env;
    
    try {
      const data = await this.getValidatedData<typeof this.schema>();
      const improvement = data.body;

      // Queue the improvement for processing
      await IMPROVEMENT_QUEUE.send({
        improvement
      });

      return {
        success: true,
        result: improvement
      };
    } catch (error) {
      return new Response(JSON.stringify({
        success: false,
        error: error.message
      }), { status: 500 });
    }
  }
}