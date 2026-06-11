import { FastifyInstance } from "fastify";
import { z } from "zod";
import { knex } from "../database";
import { randomUUID } from "node:crypto";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/", async (request, reply) => {
    const createUserBodySchema = z.object({
      name: z.string(),
      email: z.email(),
    });

    const sessionId = randomUUID();

    reply.setCookie("sessionId", sessionId, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    const { name, email } = createUserBodySchema.parse(request.body);

    const userByEmail = await knex("users").where({ email }).first();

    if (userByEmail) {
      return reply.status(400).send({ message: "User already email" });
    }

    await knex("users").insert({
      id: randomUUID(),
      name,
      email,
      session_id: sessionId,
    });

    return reply.status(201).send();
  });
}
