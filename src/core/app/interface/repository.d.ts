import { Lote } from "@prisma/client"

export interface RepostiryBoleto {
  createMany(data: Boletos[]): Promise<void>
  find(query?: any): Promise<Boletos[]>
}


export interface RepostiryLote {
  findByName(name: string): Promise<Lote | null>
}