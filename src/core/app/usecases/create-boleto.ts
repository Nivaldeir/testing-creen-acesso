import { RepostiryBoleto, RepostiryLote } from "../interface/repository";

type Input = {
  file: Express.Multer.File;
};

export class CreateBoleto {
  constructor(
    private readonly repositoryBoleto: RepostiryBoleto,
    private readonly repositoryLote: RepostiryLote
  ) {}

  async execute(input: Input) {
    const content = input.file.buffer.toString("utf-8").replaceAll('"', "").split("\r\n");
    if (content.length === 0) {
      throw new Error("Not found line");
    }

    const keys = content[0].replace(/^\ufeff/, "").split(";");

    const data = content.map((e, idx) => {
      if (idx > 0) {
        const obj: { [key: string]: string } = {};
        const values = e.split(";");
        values.forEach((c, idx) => {
          obj[keys[idx]] = c;
        });
        return obj;
      }
    }).filter((f) => f && f.unidade);

    const boletosComLote = [];

    for (const item of data) {
      const lote = await this.repositoryLote.findByName(item!.unidade);
      if (!lote) {
        console.warn(`Lote não encontrado para unidade: ${item!.unidade}`);
        continue;
      }

      const boleto = {
        ...item,
        loteId: lote.id,
      };

      boletosComLote.push(boleto);
    }
    await this.repositoryBoleto.createMany(boletosComLote)
    return boletosComLote;
  }
}