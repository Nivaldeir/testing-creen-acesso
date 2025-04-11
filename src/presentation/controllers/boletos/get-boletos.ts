import { Request, Response } from "express"
import { Method, Route } from "../../../core/app/interface/https"
import multer from "multer";
import { FindBoleto } from "../../../core/app/usecases/find-boleto";


export class BoletoGetController implements Route {

  constructor(
    public readonly path: string,
    public readonly method: Method,
    private readonly service: FindBoleto
  ) { }
  handler() {
    return async (request: Request, reply: Response): Promise<void> => {
      try {
        const query = { ...request.query };
        const output = await this.service.execute({ query })
        reply.status(200).send({ message: 'Success', data: output })
      } catch (error: any) {
        reply.status(500).send({
          message: error.message,
        })
      }
    }
  }
} 