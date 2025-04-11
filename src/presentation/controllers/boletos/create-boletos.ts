import { Request, Response } from "express"
import { Method, Route } from "../../../core/app/interface/https"
import multer from "multer";
import { CreateBoleto } from "../../../core/app/usecases/create-boleto";


export class BoletoCreateController implements Route {
  private upload = multer({ storage: multer.memoryStorage() });

  constructor(
    public readonly path: string,
    public readonly method: Method,
    private readonly service: CreateBoleto
  ) { }
  public middlewares = [this.upload.single("file")];
  handler() {
    return async (request: Request, reply: Response): Promise<void> => {
      try {
        const file = request.file as any
        if (!file) reply.status(400).send({
          message: "Nenhum arquivo enviado"
        });
        const output = await this.service.execute({
          file: file
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