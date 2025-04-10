namespace Http {
  type Method = "GET" | "POST" | "PUT" | "DELETE"

  interface Controller {
    handle(request: any, reply: any): Promise<void>
  }
  interface Route {
    path: string
    method: Method
    handler(): (request: any, reply: any) => Promise<void>
  }
  interface HttpResponse {
    statusCode: number
    body: any
  }
  interface Server {
    start(port: number): void
    settings(settings: any): void
    route(route: Http.Route): void
  }
}