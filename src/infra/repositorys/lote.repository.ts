import { Lote } from "@prisma/client";
import { prisma } from "../database/prisma";
import { RepostiryLote } from "../../core/app/interface/repository";

export class LoteRepository implements RepostiryLote {
  async findByName(name: string): Promise<Lote | null> {
    if (!name) throw new Error("Lote not found")
    return await prisma.lote.findFirstOrThrow({
      where: {
        nome: {
          contains: name
        }
      }
    })
  }
}