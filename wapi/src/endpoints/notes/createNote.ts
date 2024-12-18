import { Bool, OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { Note } from "../../types";

export class CreateNote extends OpenAPIRoute {
  schema = {
    tags: ["Notes"],
    summary: "Create a new Note2Self",
    request: {
      body: {
        content: {
          "application/json": {
            schema: Note
          }
        }
      }
    },
    responses: {
      "200": {
        description: "Returns the created note",
        content: {
          "application/json": {
            schema: z.object({
              success: Bool(),
              result: Note
            })
          }
        }
      }
    }
  };

  async handle(c) {
    const { HYPERCOG_KV } = c.env;
    
    try {
      const data = await this.getValidatedData<typeof this.schema>();
      const note = data.body;

      // Store note in KV
      await HYPERCOG_KV.put(`note:${note.id}`, JSON.stringify(note));

      return {
        success: true,
        result: note
      };
    } catch (error) {
      return new Response(JSON.stringify({
        success: false,
        error: error.message
      }), { status: 500 });
    }
  }
}