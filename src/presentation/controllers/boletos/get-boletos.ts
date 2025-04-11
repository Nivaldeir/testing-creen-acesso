import { Request, Response } from "express"
import { Method, Route } from "../../../core/app/interface/https"
import multer from "multer";


export class BoletoGetController implements Route {

  constructor(
    public readonly path: string,
    public readonly method: Method,
    private readonly service: any
  ) { }
  handler() {
    return async (request: Request, reply: Response): Promise<void> => {
      try {
        const query = { ...request.query };
        const output = await this.service.execute({ query })
        reply.status(200).send({ message: 'Success', data: output })
      } catch (error: unknown) {
        console.log(error)
      }
    }
  }
} 