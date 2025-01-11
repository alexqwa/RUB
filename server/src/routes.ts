import { z } from "zod"
import { v7 } from "uuid"
import { prisma } from "./lib/prisma"
import { FastifyInstance } from "fastify"

export async function appRoutes(app: FastifyInstance) {
  // Create a department
  app.post("/departaments", async (request) => {
    const createDepartamentBody = z.object({
      title: z.string(),
      isActive: z.boolean(),
      weekdays: z.array(z.number().min(0).max(6)),
    })

    const { title, isActive, weekdays } = createDepartamentBody.parse(
      request.body
    )

    await prisma.departament.create({
      data: {
        title,
        isActive,
        weekdays: {
          create: weekdays.map((weekDay) => {
            return { day: weekDay }
          }),
        },
      },
    })
  })

  // Search all departments
  app.get("/departaments", async (request, reply) => {
    const departaments = await prisma.departament.findMany({
      include: { weekdays: true, streets: true },
    })
    reply.send(departaments)
  })

  // Create a Street
  app.post("/streets", async (request) => {
    const createStreetBody = z.object({
      code: z.string(),
      title: z.string(),
      isActive: z.boolean(),
      weekday: z.number().min(0).max(6),
      departamentId: z.number(),
    })

    const { code, title, isActive, weekday, departamentId } =
      createStreetBody.parse(request.body)

    await prisma.street.create({
      data: {
        code,
        title,
        isActive,
        weekday,
        departament: { connect: { id: departamentId } },
      },
    })
  })

  // Route to get all Streets of a Department
  app.get("/departaments/:id/streets", async (request, reply) => {
    const streetParams = z.object({
      id: z.string(),
    })

    const { id } = streetParams.parse(request.params)

    const streets = await prisma.street.findMany({
      where: { departamentId: Number(id) },
    })
    reply.send(streets)
  })
}
