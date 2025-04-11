import { Boletos } from "@prisma/client";
import { RepostiryBoleto } from "../interface/repository";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

type Input = {
  query: {
    nome?: string;
    id_lote?: string | number;
    relatorio?: string | number;
    valor_inicial?: string | number
    valor_final?: string | number
  };
};

export class FindBoleto {
  constructor(private readonly repositoryBoleto: RepostiryBoleto) { }

  async execute(input: Input) {
    const query = this.returnQueryToPrisma(input)
    const boletos = await this.repositoryBoleto.find(query);

    const isRelatorio = String(input.query.relatorio) === "1";
    if (isRelatorio) {
      if (boletos.length === 0) return { base64: null };
      const base64 = await this.generatePdf(boletos);
      return { base64 };
    }

    return boletos;
  }

  private async generatePdf(boletos: Boletos[]) {
    const pdfDoc = await PDFDocument.create();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontSize = 14;

    for (const boleto of boletos) {
      const page = pdfDoc.addPage([595, 842]);
      let y = 750;

      const draw = (label: string, value: string) => {
        page.drawText(`${label}: ${value}`, {
          x: 50,
          y,
          size: fontSize,
          font,
          color: rgb(0, 0, 0),
        });
        y -= 30;
      };

      draw("ID", boleto.id.toString());
      draw("Nome Sacado", boleto.nome_sacado);
      draw("ID do Lote", boleto.id_lote.toString());
      draw("Valor", `R$ ${boleto.valor.toFixed(2)}`);
      draw("Linha Digitável", boleto.linha_digitavel);
    }

    const pdfBytes = await pdfDoc.save();
    return Buffer.from(pdfBytes).toString("base64");
  }

  private returnQueryToPrisma(params: Input) {
    const { nome, id_lote, valor_final, valor_inicial } = params.query;

    const query: any = {};

    if (nome) {
      query.nome_sacado = {
        contains: nome,
      };
    }

    if (id_lote) {
      query.id_lote = Number(id_lote);
    }

    if (valor_inicial || valor_final) {
      query.valor = {};
      if (valor_inicial) query.valor.gte = Number(valor_inicial);
      if (valor_final) query.valor.lte = Number(valor_final);
    }
    return query
  }
}