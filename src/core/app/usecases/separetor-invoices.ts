import { PDFDocument } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

type Input = {
  file: Express.Multer.File;
  outputDir: string;
};

export class SeparatorInvoices {
  constructor() { }

  async execute(input: Input) {
    const { file, outputDir } = input;
    const fileBuffer = file.buffer;

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const originalPdf = await PDFDocument.load(fileBuffer);
    const totalPages = originalPdf.getPageCount();

    const nomes = ["MARCIA", "JOSE", "MARCOS"];
    const newNomes = ["Jose", "Marcos", "Marcia"]
    for (let i = 0; i < totalPages; i++) {
      const newPdf = await PDFDocument.create();
      const [copiedPage] = await newPdf.copyPages(originalPdf, [i]);
      newPdf.addPage(copiedPage);

      const pdfBytes = await newPdf.save();
      const nome = nomes[i]?.toLowerCase() || `pagina-${i + 1}`;
      const position = newNomes.findIndex(f => f.toUpperCase() == nome.toUpperCase())!
      const outputPath = path.join(outputDir, `${position + 1}.pdf`);
      fs.writeFileSync(outputPath, pdfBytes);
      console.log(`Salvo: ${outputPath}`);
    }

    return `${totalPages} faturas salvas em: ${outputDir}`;
  }
}
