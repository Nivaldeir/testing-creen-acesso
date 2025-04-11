import express from "express"
import { Method, Route, Server } from "../../core/app/interface/https"

export class ExpressAdapter implements Server {
  private _server = express()
  constructor() { }
  start(port: number): void {
    this._server.listen(port, () => console.log(`Server running on port ${port}`))
  }
  settings(settings: any): void {
    throw new Error('Method not implemented.')
  }

  public route(route: Route): void {
    const method = route.method.toLowerCase() as Lowercase<Method>;

    if (route.middlewares && route.middlewares.length > 0) {
      this._server[method](
        route.path,
        ...route.middlewares,
        route.handler()
      );
    } else {
      this._server[method](route.path, route.handler());
    }
  }

} 