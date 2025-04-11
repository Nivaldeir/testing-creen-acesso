import { CreateBoleto } from "./core/app/usecases/create-boleto";
import { FindBoleto } from "./core/app/usecases/find-boleto";
import { SeparatorInvoices } from "./core/app/usecases/separetor-invoices";
import { BoletosRepository } from "./infra/repositorys/boletos.repository";
import { LoteRepository } from "./infra/repositorys/lote.repository";
import { ExpressAdapter } from "./infra/server/express";
import { BoletoCreateController } from "./presentation/controllers/boletos/create-boletos";
import { BoletoGetController } from "./presentation/controllers/boletos/get-boletos";
import { InvoicesController } from "./presentation/controllers/boletos/invoices";

const app = new ExpressAdapter()
const repositoryBoleto = new BoletosRepository()
const repositoryLote = new LoteRepository()
const createBoleto = new CreateBoleto(repositoryBoleto, repositoryLote)
const invoices = new SeparatorInvoices()
const getBoletos = new FindBoleto(repositoryBoleto)

const controllerBolletoCreate = new BoletoCreateController('/boletos', 'POST', createBoleto)
const controllerInvoices = new InvoicesController('/invoices', 'POST', invoices)
const controllerGetBoleto = new BoletoGetController('/boletos', 'GET', getBoletos)

app.route(controllerBolletoCreate)
app.route(controllerInvoices)
app.route(controllerGetBoleto)
app.start(8080)