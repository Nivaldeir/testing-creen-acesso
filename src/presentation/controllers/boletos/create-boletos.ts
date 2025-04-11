import { Request, Response } from "express"
import { Method, Route } from "../../../core/app/interface/https"
import multer from "multer";


export class BoletoCreateController implements Route {
  private upload = multer({ storage: multer.memoryStorage() });

  constructor(
    public readonly path: string,
    public readonly method: Method,
    private readonly service: any
  ) { }
  public middlewares = [this.upload.single("file")];
  handler() {
    return async (request: Request, reply: Response): Promise<void> => {
      try {
        const file = request.file;
        if (!file) reply.status(400).send("Nenhum arquivo enviado");
        const output = await this.service.execute({
          file: file
        })
        reply.status(200).send({ message: 'Success', data: output })
      } catch (error: unknown) {
        console.log(error)
        // if (error instanceof AppError) return reply.status(error.statusCode).send(error)
      }
    }
  }
} 