import { Boletos } from "@prisma/client";
import { prisma } from "../database/prisma";

export class BoletosRepository implements Repository.Boleto {
  async create(data: Boletos): Promise<void> {
    await prisma.boletos.create({
      data: {
        active: data.active,
        cod: data.cod,
        name_drawn: data.name_drawn,
        price: data.price,
        loteId: data.loteId
      }
    })
  }
}