import { z } from "zod"
import dayjs from "dayjs"
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
      expiresInDays: z.number().positive().int(),
    })

    try {
      // valindando e passando para o request.body
      const { expiresInDays } = licenseParams.parse(request.body)

      // Cálculo da expiração da data usando Day.js
      const createdAt = dayjs() // Data de criação
      const expiresAt = createdAt.add(expiresInDays, "day")

      // Cria a licença no banco de dados
      const license = await prisma.license.create({
        data: {
          key: v7(),
          createdAt: createdAt.toISOString(),
          expiresAt: expiresAt.toISOString(),
        },
      })

      // Envie a licença criada de volta na resposta com um código de status 201
      reply.code(201).send(license)
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Retorna código '400' para inputs inválidos
        reply
          .code(400)
          .send({ error: "Input inválido.", details: error.errors })
      } else {
        // Para outros erros (e.g., database erros)
        console.error("Error generating license:", error)
        reply.code(500).send({ error: "Internal Server Error" })
      }
    }
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

    try {
      // Validando e passando para o request.body
      const { key } = licenseParams.parse(request.body)

      // Busca a licença no banco de dados
      const license = await prisma.license.findUnique({
        where: { key },
        select: {
          id: true,
          key: true,
          createdAt: true,
          expiresAt: true,
        },
      })

      // Verifica se a licença existe e se não expirou
      if (license && dayjs(license.expiresAt).isAfter(dayjs())) {
        return reply.send({ ...license, valid: true })
      } else {
        return reply.send({ valid: false })
      }
    } catch (error) {
      // Tratamento de erros
      console.error("Error verifying license:", error)
      reply.code(500).send({ error: "Internal Server Error" })
    }
  })

  // Rota para deletar todas as licenças
  app.delete("/licenses", async (request, reply) => {
    try {
      const deletedLicenses = await prisma.license.deleteMany({})
      reply.send({
        message: `${deletedLicenses.count} licença(s) deletadas com sucesso.`,
      })
    } catch (error) {
      console.error(error)
      reply.status(500).send({ error: "Erro ao deletar as licenças." })
    }
  })

  // Rota para deletar uma licença com [id] específico
  app.delete("/licenses/:id", async (request, reply) => {
    const licenseParams = z.object({
      id: z.string(),
    })

    const { id } = licenseParams.parse(request.params)

    try {
      await prisma.license.delete({
        where: { id: Number(id) },
      })
      return reply
        .status(200)
        .send({ message: `Licença com ID ${id} deletada com sucesso.` })
    } catch (error) {
      if (error === "P2025") {
        return reply
          .status(404)
          .send({ message: `Licença com ID ${id} não encontrada.` })
      }
      return reply.status(500).send({ message: "Erro ao deletar licença!" })
    }
  })
}
