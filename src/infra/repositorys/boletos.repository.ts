import { prisma } from "../database/prisma";
import { RepostiryBoleto } from "../../core/app/interface/repository";
import { Boletos } from "@prisma/client";

export class BoletosRepository implements RepostiryBoleto {
  async find(query?: any): Promise<Boletos[]> {
    const output = await prisma.boletos.findMany({
      where: {
        ...query
      }
    })
    return output
  }
  async createMany(data: any[]): Promise<void> {
    await prisma.boletos.createMany({
      data: data.map(b => ({
        valor: parseFloat(b.valor.toString()),
        ativo: true,
        linha_digitavel: b.linha_digitavel,
        id_lote: b.loteId,
        nome_sacado: b.nome
      }))
    })
  }
}