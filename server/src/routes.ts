import dayjs from "dayjs"
import { z } from "zod"
import { v7 } from "uuid"
import { prisma } from "./lib/prisma"
import { FastifyInstance } from "fastify"

export async function appRoutes(app: FastifyInstance) {
  // Rota para criar um departamento
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

  // Rota para listar todos os departamentos
  app.get("/departaments", async (request, reply) => {
    const departaments = await prisma.departament.findMany({
      include: { weekdays: true, streets: true },
    })
    reply.send(departaments)
  })

  // Rota para criar uma rua
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

  // Rota para obter todas as ruas de um departamento
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

  // Rota para gerar licenças
  app.post("/generate-license", async (request, reply) => {
    const licenseParams = z.object({
      expiresInDays: z.number(),
    })

    const { expiresInDays } = licenseParams.parse(request.body)
    const createdAt = new Date()
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + expiresInDays)

    const license = await prisma.license.create({
      data: {
        key: v7(),
        createdAt: createdAt,
        expiresAt: expiresAt,
      },
    })

    const formattedLicense = {
      id: license.id,
      key: license.key,
      createdAt: dayjs(license.createdAt).format("DD/MM/YYYY HH:mm:ss"),
      expiresAt: dayjs(license.expiresAt).format("DD/MM/YYYY HH:mm:ss"),
    }

    reply.send(formattedLicense)
  })

  // Rota para listar todas as licenças
  app.get("/licenses", async (request, reply) => {
    try {
      const licenses = await prisma.license.findMany()
      reply.send(licenses)
    } catch (error) {
      console.error(error)
      reply.status(500).send({ error: "Erro ao buscar licenças." })
    }
  })

  // Rota verificar se a licença existe
  app.post("/verify-license", async (request, reply) => {
    const licenseParams = z.object({
      key: z.string(),
    })

    const { key } = licenseParams.parse(request.body)

    const license = await prisma.license.findUnique({
      where: { key },
    })

    if (license && license.expiresAt > new Date()) {
      return reply.send({ valid: true })
    } else {
      return reply.send({ valid: false })
    }
  })

  // Rota para deletar todas as licenças
  app.delete("/licenses", async (request, reply) => {
    try {
      const deletedLicenses = await prisma.license.deleteMany({})
      reply.send({
        message: `${deletedLicenses.count} licenças deletadas com sucesso.`,
      })
    } catch (error) {
      console.error(error)
      reply.status(500).send({ error: "Erro ao deletar as licenças." })
    }
  })
}
