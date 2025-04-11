import { Request, Response } from "express"
import { Method, Route } from "../../../core/app/interface/https"
import path from "path"
import multer from "multer";
import { SeparatorInvoices } from "../../../core/app/usecases/separetor-invoices";


export class InvoicesController implements Route {
  private upload = multer({ storage: multer.memoryStorage() });

  constructor(
    public readonly path: string,
    public readonly method: Method,
    private readonly service: SeparatorInvoices
  ) { }
  public middlewares = [this.upload.single("file")];
  handler() {
    return async (request: Request, reply: Response): Promise<void> => {
      try {
        const file = request.file as any;
        if (!file) reply.status(400).send("Nenhum arquivo enviado");
        const output = await this.service.execute({
          file: file,
          outputDir: path.resolve(__dirname, "../../../../files/invoices"),
        })
        reply.status(200).send({ message: 'Success', data: output })
      } catch (error: any) {
        reply.status(500).send({
          message: error.message,
        })
      }
    }
  }
} 