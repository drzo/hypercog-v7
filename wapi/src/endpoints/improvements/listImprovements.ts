import { Bool, OpenAPIRoute, Num } from "chanfana";
import { z } from "zod";
import { ImprovementAction } from "../../types";

export class ListImprovements extends OpenAPIRoute {
  schema = {
    tags: ["Improvements"],
    summary: "List improvements",
    request: {
      query: z.object({
        page: Num({ default: 1 }),
        limit: Num({ default: 10 })
      })
    },
    responses: {
      "200": {
        description: "Returns list of improvements",
        content: {
          "application/json": {
            schema: z.object({
              success: Bool(),
              result: z.object({
                items: z.array(ImprovementAction),
                total: z.number(),
                page: z.number(),
                limit: z.number()
              })
            })
          }
        }
      }
    }
  };

  async handle(c) {
    const { DB } = c.env;
    const data = await this.getValidatedData<typeof this.schema>();
    const { page, limit } = data.query;
    const offset = (page - 1) * limit;
    
    try {
      const [items, [{total}]] = await Promise.all([
        DB.prepare("SELECT * FROM improvements ORDER BY created_at DESC LIMIT ? OFFSET ?")
          .bind(limit, offset)
          .all(),
        DB.prepare("SELECT COUNT(*) as total FROM improvements").all()
      ]);

      return {
        success: true,
        result: {
          items: items.results,
          total,
          page,
          limit
        }
      };
    } catch (error) {
      return new Response(JSON.stringify({
        success: false,
        error: error.message
      }), { status: 500 });
    }
  }
}