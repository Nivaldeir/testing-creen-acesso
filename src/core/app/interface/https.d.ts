export type Method = "GET" | "POST" | "PUT" | "DELETE"

export interface Controller {
  handle(request: any, reply: any): Promise<void>
}
export interface Route {
  path: string
  method: Method
  handler(): (request: any, reply: any) => Promise<void>
  middlewares?: express.RequestHandler[];
}
export interface HttpResponse {
  statusCode: number
  body: any
}
export interface Server {
  start(port: number): void
  settings(settings: any): void
  route(route: Http.Route): void
}