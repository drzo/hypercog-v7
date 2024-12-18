import { Bool, OpenAPIRoute, Str } from "chanfana";
import { z } from "zod";
import { ImprovementAction } from "../../types";

export class GetImprovement extends OpenAPIRoute {
  schema = {
    tags: ["Improvements"],
    summary: "Get improvement by ID",
    request: {
      params: z.object({
        id: Str()
      })
    },
    responses: {
      "200": {
        description: "Returns the improvement",
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
    const { DB } = c.env;
    const data = await this.getValidatedData<typeof this.schema>();
    
    try {
      const improvement = await DB.prepare(
        "SELECT * FROM improvements WHERE id = ?"
      ).bind(data.params.id).first();

      if (!improvement) {
        return new Response(JSON.stringify({
          success: false,
          error: "Improvement not found"
        }), { status: 404 });
      }

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